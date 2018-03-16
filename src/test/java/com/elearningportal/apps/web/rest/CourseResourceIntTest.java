package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Course;
import com.elearningportal.apps.repository.CourseRepository;
import com.elearningportal.apps.repository.search.CourseSearchRepository;
import com.elearningportal.apps.service.dto.CourseDTO;
import com.elearningportal.apps.service.mapper.CourseMapper;
import com.elearningportal.apps.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.elearningportal.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CourseResource REST controller.
 *
 * @see CourseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class CourseResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SLUG = "AAAAAAAAAA";
    private static final String UPDATED_SLUG = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_DESC = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORIES = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIES = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Boolean DEFAULT_PREMIUM = false;
    private static final Boolean UPDATED_PREMIUM = true;

    private static final String DEFAULT_COURSE_HRS = "AAAAAAAAAA";
    private static final String UPDATED_COURSE_HRS = "BBBBBBBBBB";

    private static final String DEFAULT_TAG_LINE = "AAAAAAAAAA";
    private static final String UPDATED_TAG_LINE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PREMIUM_TILL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PREMIUM_TILL = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private CourseSearchRepository courseSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourseMockMvc;

    private Course course;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourseResource courseResource = new CourseResource(courseRepository, courseMapper, courseSearchRepository);
        this.restCourseMockMvc = MockMvcBuilders.standaloneSetup(courseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Course createEntity(EntityManager em) {
        Course course = new Course()
            .name(DEFAULT_NAME)
            .slug(DEFAULT_SLUG)
            .type(DEFAULT_TYPE)
            .shortDesc(DEFAULT_SHORT_DESC)
            .categories(DEFAULT_CATEGORIES)
            .active(DEFAULT_ACTIVE)
            .premium(DEFAULT_PREMIUM)
            .courseHrs(DEFAULT_COURSE_HRS)
            .tagLine(DEFAULT_TAG_LINE)
            .premiumTill(DEFAULT_PREMIUM_TILL);
        return course;
    }

    @Before
    public void initTest() {
        courseSearchRepository.deleteAll();
        course = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourse() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(course);
        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate + 1);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCourse.getSlug()).isEqualTo(DEFAULT_SLUG);
        assertThat(testCourse.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCourse.getShortDesc()).isEqualTo(DEFAULT_SHORT_DESC);
        assertThat(testCourse.getCategories()).isEqualTo(DEFAULT_CATEGORIES);
        assertThat(testCourse.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testCourse.isPremium()).isEqualTo(DEFAULT_PREMIUM);
        assertThat(testCourse.getCourseHrs()).isEqualTo(DEFAULT_COURSE_HRS);
        assertThat(testCourse.getTagLine()).isEqualTo(DEFAULT_TAG_LINE);
        assertThat(testCourse.getPremiumTill()).isEqualTo(DEFAULT_PREMIUM_TILL);

        // Validate the Course in Elasticsearch
        Course courseEs = courseSearchRepository.findOne(testCourse.getId());
        assertThat(courseEs).isEqualToIgnoringGivenFields(testCourse);
    }

    @Test
    @Transactional
    public void createCourseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course with an existing ID
        course.setId(1L);
        CourseDTO courseDTO = courseMapper.toDto(course);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseMockMvc.perform(post("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCourses() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get all the courseList
        restCourseMockMvc.perform(get("/api/courses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(course.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].shortDesc").value(hasItem(DEFAULT_SHORT_DESC.toString())))
            .andExpect(jsonPath("$.[*].categories").value(hasItem(DEFAULT_CATEGORIES.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].premium").value(hasItem(DEFAULT_PREMIUM.booleanValue())))
            .andExpect(jsonPath("$.[*].courseHrs").value(hasItem(DEFAULT_COURSE_HRS.toString())))
            .andExpect(jsonPath("$.[*].tagLine").value(hasItem(DEFAULT_TAG_LINE.toString())))
            .andExpect(jsonPath("$.[*].premiumTill").value(hasItem(DEFAULT_PREMIUM_TILL.toString())));
    }

    @Test
    @Transactional
    public void getCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", course.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(course.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.slug").value(DEFAULT_SLUG.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.shortDesc").value(DEFAULT_SHORT_DESC.toString()))
            .andExpect(jsonPath("$.categories").value(DEFAULT_CATEGORIES.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.premium").value(DEFAULT_PREMIUM.booleanValue()))
            .andExpect(jsonPath("$.courseHrs").value(DEFAULT_COURSE_HRS.toString()))
            .andExpect(jsonPath("$.tagLine").value(DEFAULT_TAG_LINE.toString()))
            .andExpect(jsonPath("$.premiumTill").value(DEFAULT_PREMIUM_TILL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourse() throws Exception {
        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);
        courseSearchRepository.save(course);
        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Update the course
        Course updatedCourse = courseRepository.findOne(course.getId());
        // Disconnect from session so that the updates on updatedCourse are not directly saved in db
        em.detach(updatedCourse);
        updatedCourse
            .name(UPDATED_NAME)
            .slug(UPDATED_SLUG)
            .type(UPDATED_TYPE)
            .shortDesc(UPDATED_SHORT_DESC)
            .categories(UPDATED_CATEGORIES)
            .active(UPDATED_ACTIVE)
            .premium(UPDATED_PREMIUM)
            .courseHrs(UPDATED_COURSE_HRS)
            .tagLine(UPDATED_TAG_LINE)
            .premiumTill(UPDATED_PREMIUM_TILL);
        CourseDTO courseDTO = courseMapper.toDto(updatedCourse);

        restCourseMockMvc.perform(put("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isOk());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCourse.getSlug()).isEqualTo(UPDATED_SLUG);
        assertThat(testCourse.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCourse.getShortDesc()).isEqualTo(UPDATED_SHORT_DESC);
        assertThat(testCourse.getCategories()).isEqualTo(UPDATED_CATEGORIES);
        assertThat(testCourse.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testCourse.isPremium()).isEqualTo(UPDATED_PREMIUM);
        assertThat(testCourse.getCourseHrs()).isEqualTo(UPDATED_COURSE_HRS);
        assertThat(testCourse.getTagLine()).isEqualTo(UPDATED_TAG_LINE);
        assertThat(testCourse.getPremiumTill()).isEqualTo(UPDATED_PREMIUM_TILL);

        // Validate the Course in Elasticsearch
        Course courseEs = courseSearchRepository.findOne(testCourse.getId());
        assertThat(courseEs).isEqualToIgnoringGivenFields(testCourse);
    }

    @Test
    @Transactional
    public void updateNonExistingCourse() throws Exception {
        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(course);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourseMockMvc.perform(put("/api/courses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courseDTO)))
            .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);
        courseSearchRepository.save(course);
        int databaseSizeBeforeDelete = courseRepository.findAll().size();

        // Get the course
        restCourseMockMvc.perform(delete("/api/courses/{id}", course.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean courseExistsInEs = courseSearchRepository.exists(course.getId());
        assertThat(courseExistsInEs).isFalse();

        // Validate the database is empty
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);
        courseSearchRepository.save(course);

        // Search the course
        restCourseMockMvc.perform(get("/api/_search/courses?query=id:" + course.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(course.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].shortDesc").value(hasItem(DEFAULT_SHORT_DESC.toString())))
            .andExpect(jsonPath("$.[*].categories").value(hasItem(DEFAULT_CATEGORIES.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].premium").value(hasItem(DEFAULT_PREMIUM.booleanValue())))
            .andExpect(jsonPath("$.[*].courseHrs").value(hasItem(DEFAULT_COURSE_HRS.toString())))
            .andExpect(jsonPath("$.[*].tagLine").value(hasItem(DEFAULT_TAG_LINE.toString())))
            .andExpect(jsonPath("$.[*].premiumTill").value(hasItem(DEFAULT_PREMIUM_TILL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Course.class);
        Course course1 = new Course();
        course1.setId(1L);
        Course course2 = new Course();
        course2.setId(course1.getId());
        assertThat(course1).isEqualTo(course2);
        course2.setId(2L);
        assertThat(course1).isNotEqualTo(course2);
        course1.setId(null);
        assertThat(course1).isNotEqualTo(course2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseDTO.class);
        CourseDTO courseDTO1 = new CourseDTO();
        courseDTO1.setId(1L);
        CourseDTO courseDTO2 = new CourseDTO();
        assertThat(courseDTO1).isNotEqualTo(courseDTO2);
        courseDTO2.setId(courseDTO1.getId());
        assertThat(courseDTO1).isEqualTo(courseDTO2);
        courseDTO2.setId(2L);
        assertThat(courseDTO1).isNotEqualTo(courseDTO2);
        courseDTO1.setId(null);
        assertThat(courseDTO1).isNotEqualTo(courseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(courseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(courseMapper.fromId(null)).isNull();
    }
}

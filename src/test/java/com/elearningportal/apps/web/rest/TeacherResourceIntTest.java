package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Teacher;
import com.elearningportal.apps.repository.TeacherRepository;
import com.elearningportal.apps.repository.search.TeacherSearchRepository;
import com.elearningportal.apps.service.dto.TeacherDTO;
import com.elearningportal.apps.service.mapper.TeacherMapper;
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
 * Test class for the TeacherResource REST controller.
 *
 * @see TeacherResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class TeacherResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ABOUT = "AAAAAAAAAA";
    private static final String UPDATED_ABOUT = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final Integer DEFAULT_COLLEGE_YEAR = 1900;
    private static final Integer UPDATED_COLLEGE_YEAR = 1901;

    private static final LocalDate DEFAULT_DOB = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DOB = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_ALTERNATIVE_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_ALTERNATIVE_MOBILE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PREMIUM = false;
    private static final Boolean UPDATED_PREMIUM = true;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_LANGUAGES_SPOKEN = "AAAAAAAAAA";
    private static final String UPDATED_LANGUAGES_SPOKEN = "BBBBBBBBBB";

    private static final String DEFAULT_SLUG = "AAAAAAAAAA";
    private static final String UPDATED_SLUG = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PREMIUM_TILL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PREMIUM_TILL = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REFERENCE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_SIGN_UP_BY_REFERENCE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SIGN_UP_BY_REFERENCE_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE_URL = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_TWITTER = "AAAAAAAAAA";
    private static final String UPDATED_TWITTER = "BBBBBBBBBB";

    private static final String DEFAULT_FACEBOOK = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK = "BBBBBBBBBB";

    private static final String DEFAULT_GOOGLE_PLUS = "AAAAAAAAAA";
    private static final String UPDATED_GOOGLE_PLUS = "BBBBBBBBBB";

    private static final String DEFAULT_LINKED_IN = "AAAAAAAAAA";
    private static final String UPDATED_LINKED_IN = "BBBBBBBBBB";

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private TeacherSearchRepository teacherSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTeacherMockMvc;

    private Teacher teacher;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeacherResource teacherResource = new TeacherResource(teacherRepository, teacherMapper, teacherSearchRepository);
        this.restTeacherMockMvc = MockMvcBuilders.standaloneSetup(teacherResource)
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
    public static Teacher createEntity(EntityManager em) {
        Teacher teacher = new Teacher()
            .name(DEFAULT_NAME)
            .about(DEFAULT_ABOUT)
            .imageUrl(DEFAULT_IMAGE_URL)
            .collegeYear(DEFAULT_COLLEGE_YEAR)
            .dob(DEFAULT_DOB)
            .mobile(DEFAULT_MOBILE)
            .alternativeMobile(DEFAULT_ALTERNATIVE_MOBILE)
            .premium(DEFAULT_PREMIUM)
            .active(DEFAULT_ACTIVE)
            .languagesSpoken(DEFAULT_LANGUAGES_SPOKEN)
            .slug(DEFAULT_SLUG)
            .premiumTill(DEFAULT_PREMIUM_TILL)
            .referenceCode(DEFAULT_REFERENCE_CODE)
            .signUpByReferenceCode(DEFAULT_SIGN_UP_BY_REFERENCE_CODE)
            .websiteURL(DEFAULT_WEBSITE_URL)
            .twitter(DEFAULT_TWITTER)
            .facebook(DEFAULT_FACEBOOK)
            .googlePlus(DEFAULT_GOOGLE_PLUS)
            .linkedIn(DEFAULT_LINKED_IN);
        return teacher;
    }

    @Before
    public void initTest() {
        teacherSearchRepository.deleteAll();
        teacher = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeacher() throws Exception {
        int databaseSizeBeforeCreate = teacherRepository.findAll().size();

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);
        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isCreated());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeCreate + 1);
        Teacher testTeacher = teacherList.get(teacherList.size() - 1);
        assertThat(testTeacher.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTeacher.getAbout()).isEqualTo(DEFAULT_ABOUT);
        assertThat(testTeacher.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testTeacher.getCollegeYear()).isEqualTo(DEFAULT_COLLEGE_YEAR);
        assertThat(testTeacher.getDob()).isEqualTo(DEFAULT_DOB);
        assertThat(testTeacher.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testTeacher.getAlternativeMobile()).isEqualTo(DEFAULT_ALTERNATIVE_MOBILE);
        assertThat(testTeacher.isPremium()).isEqualTo(DEFAULT_PREMIUM);
        assertThat(testTeacher.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testTeacher.getLanguagesSpoken()).isEqualTo(DEFAULT_LANGUAGES_SPOKEN);
        assertThat(testTeacher.getSlug()).isEqualTo(DEFAULT_SLUG);
        assertThat(testTeacher.getPremiumTill()).isEqualTo(DEFAULT_PREMIUM_TILL);
        assertThat(testTeacher.getReferenceCode()).isEqualTo(DEFAULT_REFERENCE_CODE);
        assertThat(testTeacher.getSignUpByReferenceCode()).isEqualTo(DEFAULT_SIGN_UP_BY_REFERENCE_CODE);
        assertThat(testTeacher.getWebsiteURL()).isEqualTo(DEFAULT_WEBSITE_URL);
        assertThat(testTeacher.getTwitter()).isEqualTo(DEFAULT_TWITTER);
        assertThat(testTeacher.getFacebook()).isEqualTo(DEFAULT_FACEBOOK);
        assertThat(testTeacher.getGooglePlus()).isEqualTo(DEFAULT_GOOGLE_PLUS);
        assertThat(testTeacher.getLinkedIn()).isEqualTo(DEFAULT_LINKED_IN);

        // Validate the Teacher in Elasticsearch
        Teacher teacherEs = teacherSearchRepository.findOne(testTeacher.getId());
        assertThat(teacherEs).isEqualToIgnoringGivenFields(testTeacher);
    }

    @Test
    @Transactional
    public void createTeacherWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teacherRepository.findAll().size();

        // Create the Teacher with an existing ID
        teacher.setId(1L);
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = teacherRepository.findAll().size();
        // set the field null
        teacher.setName(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSlugIsRequired() throws Exception {
        int databaseSizeBeforeTest = teacherRepository.findAll().size();
        // set the field null
        teacher.setSlug(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTeachers() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList
        restTeacherMockMvc.perform(get("/api/teachers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teacher.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT.toString())))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL.toString())))
            .andExpect(jsonPath("$.[*].collegeYear").value(hasItem(DEFAULT_COLLEGE_YEAR)))
            .andExpect(jsonPath("$.[*].dob").value(hasItem(DEFAULT_DOB.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].alternativeMobile").value(hasItem(DEFAULT_ALTERNATIVE_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].premium").value(hasItem(DEFAULT_PREMIUM.booleanValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].languagesSpoken").value(hasItem(DEFAULT_LANGUAGES_SPOKEN.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].premiumTill").value(hasItem(DEFAULT_PREMIUM_TILL.toString())))
            .andExpect(jsonPath("$.[*].referenceCode").value(hasItem(DEFAULT_REFERENCE_CODE.toString())))
            .andExpect(jsonPath("$.[*].signUpByReferenceCode").value(hasItem(DEFAULT_SIGN_UP_BY_REFERENCE_CODE.toString())))
            .andExpect(jsonPath("$.[*].websiteURL").value(hasItem(DEFAULT_WEBSITE_URL.toString())))
            .andExpect(jsonPath("$.[*].twitter").value(hasItem(DEFAULT_TWITTER.toString())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK.toString())))
            .andExpect(jsonPath("$.[*].googlePlus").value(hasItem(DEFAULT_GOOGLE_PLUS.toString())))
            .andExpect(jsonPath("$.[*].linkedIn").value(hasItem(DEFAULT_LINKED_IN.toString())));
    }

    @Test
    @Transactional
    public void getTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get the teacher
        restTeacherMockMvc.perform(get("/api/teachers/{id}", teacher.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teacher.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.about").value(DEFAULT_ABOUT.toString()))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL.toString()))
            .andExpect(jsonPath("$.collegeYear").value(DEFAULT_COLLEGE_YEAR))
            .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE.toString()))
            .andExpect(jsonPath("$.alternativeMobile").value(DEFAULT_ALTERNATIVE_MOBILE.toString()))
            .andExpect(jsonPath("$.premium").value(DEFAULT_PREMIUM.booleanValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.languagesSpoken").value(DEFAULT_LANGUAGES_SPOKEN.toString()))
            .andExpect(jsonPath("$.slug").value(DEFAULT_SLUG.toString()))
            .andExpect(jsonPath("$.premiumTill").value(DEFAULT_PREMIUM_TILL.toString()))
            .andExpect(jsonPath("$.referenceCode").value(DEFAULT_REFERENCE_CODE.toString()))
            .andExpect(jsonPath("$.signUpByReferenceCode").value(DEFAULT_SIGN_UP_BY_REFERENCE_CODE.toString()))
            .andExpect(jsonPath("$.websiteURL").value(DEFAULT_WEBSITE_URL.toString()))
            .andExpect(jsonPath("$.twitter").value(DEFAULT_TWITTER.toString()))
            .andExpect(jsonPath("$.facebook").value(DEFAULT_FACEBOOK.toString()))
            .andExpect(jsonPath("$.googlePlus").value(DEFAULT_GOOGLE_PLUS.toString()))
            .andExpect(jsonPath("$.linkedIn").value(DEFAULT_LINKED_IN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTeacher() throws Exception {
        // Get the teacher
        restTeacherMockMvc.perform(get("/api/teachers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);
        teacherSearchRepository.save(teacher);
        int databaseSizeBeforeUpdate = teacherRepository.findAll().size();

        // Update the teacher
        Teacher updatedTeacher = teacherRepository.findOne(teacher.getId());
        // Disconnect from session so that the updates on updatedTeacher are not directly saved in db
        em.detach(updatedTeacher);
        updatedTeacher
            .name(UPDATED_NAME)
            .about(UPDATED_ABOUT)
            .imageUrl(UPDATED_IMAGE_URL)
            .collegeYear(UPDATED_COLLEGE_YEAR)
            .dob(UPDATED_DOB)
            .mobile(UPDATED_MOBILE)
            .alternativeMobile(UPDATED_ALTERNATIVE_MOBILE)
            .premium(UPDATED_PREMIUM)
            .active(UPDATED_ACTIVE)
            .languagesSpoken(UPDATED_LANGUAGES_SPOKEN)
            .slug(UPDATED_SLUG)
            .premiumTill(UPDATED_PREMIUM_TILL)
            .referenceCode(UPDATED_REFERENCE_CODE)
            .signUpByReferenceCode(UPDATED_SIGN_UP_BY_REFERENCE_CODE)
            .websiteURL(UPDATED_WEBSITE_URL)
            .twitter(UPDATED_TWITTER)
            .facebook(UPDATED_FACEBOOK)
            .googlePlus(UPDATED_GOOGLE_PLUS)
            .linkedIn(UPDATED_LINKED_IN);
        TeacherDTO teacherDTO = teacherMapper.toDto(updatedTeacher);

        restTeacherMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isOk());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeUpdate);
        Teacher testTeacher = teacherList.get(teacherList.size() - 1);
        assertThat(testTeacher.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTeacher.getAbout()).isEqualTo(UPDATED_ABOUT);
        assertThat(testTeacher.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testTeacher.getCollegeYear()).isEqualTo(UPDATED_COLLEGE_YEAR);
        assertThat(testTeacher.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testTeacher.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testTeacher.getAlternativeMobile()).isEqualTo(UPDATED_ALTERNATIVE_MOBILE);
        assertThat(testTeacher.isPremium()).isEqualTo(UPDATED_PREMIUM);
        assertThat(testTeacher.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testTeacher.getLanguagesSpoken()).isEqualTo(UPDATED_LANGUAGES_SPOKEN);
        assertThat(testTeacher.getSlug()).isEqualTo(UPDATED_SLUG);
        assertThat(testTeacher.getPremiumTill()).isEqualTo(UPDATED_PREMIUM_TILL);
        assertThat(testTeacher.getReferenceCode()).isEqualTo(UPDATED_REFERENCE_CODE);
        assertThat(testTeacher.getSignUpByReferenceCode()).isEqualTo(UPDATED_SIGN_UP_BY_REFERENCE_CODE);
        assertThat(testTeacher.getWebsiteURL()).isEqualTo(UPDATED_WEBSITE_URL);
        assertThat(testTeacher.getTwitter()).isEqualTo(UPDATED_TWITTER);
        assertThat(testTeacher.getFacebook()).isEqualTo(UPDATED_FACEBOOK);
        assertThat(testTeacher.getGooglePlus()).isEqualTo(UPDATED_GOOGLE_PLUS);
        assertThat(testTeacher.getLinkedIn()).isEqualTo(UPDATED_LINKED_IN);

        // Validate the Teacher in Elasticsearch
        Teacher teacherEs = teacherSearchRepository.findOne(testTeacher.getId());
        assertThat(teacherEs).isEqualToIgnoringGivenFields(testTeacher);
    }

    @Test
    @Transactional
    public void updateNonExistingTeacher() throws Exception {
        int databaseSizeBeforeUpdate = teacherRepository.findAll().size();

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTeacherMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDTO)))
            .andExpect(status().isCreated());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);
        teacherSearchRepository.save(teacher);
        int databaseSizeBeforeDelete = teacherRepository.findAll().size();

        // Get the teacher
        restTeacherMockMvc.perform(delete("/api/teachers/{id}", teacher.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean teacherExistsInEs = teacherSearchRepository.exists(teacher.getId());
        assertThat(teacherExistsInEs).isFalse();

        // Validate the database is empty
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);
        teacherSearchRepository.save(teacher);

        // Search the teacher
        restTeacherMockMvc.perform(get("/api/_search/teachers?query=id:" + teacher.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teacher.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT.toString())))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL.toString())))
            .andExpect(jsonPath("$.[*].collegeYear").value(hasItem(DEFAULT_COLLEGE_YEAR)))
            .andExpect(jsonPath("$.[*].dob").value(hasItem(DEFAULT_DOB.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].alternativeMobile").value(hasItem(DEFAULT_ALTERNATIVE_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].premium").value(hasItem(DEFAULT_PREMIUM.booleanValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].languagesSpoken").value(hasItem(DEFAULT_LANGUAGES_SPOKEN.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].premiumTill").value(hasItem(DEFAULT_PREMIUM_TILL.toString())))
            .andExpect(jsonPath("$.[*].referenceCode").value(hasItem(DEFAULT_REFERENCE_CODE.toString())))
            .andExpect(jsonPath("$.[*].signUpByReferenceCode").value(hasItem(DEFAULT_SIGN_UP_BY_REFERENCE_CODE.toString())))
            .andExpect(jsonPath("$.[*].websiteURL").value(hasItem(DEFAULT_WEBSITE_URL.toString())))
            .andExpect(jsonPath("$.[*].twitter").value(hasItem(DEFAULT_TWITTER.toString())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK.toString())))
            .andExpect(jsonPath("$.[*].googlePlus").value(hasItem(DEFAULT_GOOGLE_PLUS.toString())))
            .andExpect(jsonPath("$.[*].linkedIn").value(hasItem(DEFAULT_LINKED_IN.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teacher.class);
        Teacher teacher1 = new Teacher();
        teacher1.setId(1L);
        Teacher teacher2 = new Teacher();
        teacher2.setId(teacher1.getId());
        assertThat(teacher1).isEqualTo(teacher2);
        teacher2.setId(2L);
        assertThat(teacher1).isNotEqualTo(teacher2);
        teacher1.setId(null);
        assertThat(teacher1).isNotEqualTo(teacher2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeacherDTO.class);
        TeacherDTO teacherDTO1 = new TeacherDTO();
        teacherDTO1.setId(1L);
        TeacherDTO teacherDTO2 = new TeacherDTO();
        assertThat(teacherDTO1).isNotEqualTo(teacherDTO2);
        teacherDTO2.setId(teacherDTO1.getId());
        assertThat(teacherDTO1).isEqualTo(teacherDTO2);
        teacherDTO2.setId(2L);
        assertThat(teacherDTO1).isNotEqualTo(teacherDTO2);
        teacherDTO1.setId(null);
        assertThat(teacherDTO1).isNotEqualTo(teacherDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(teacherMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(teacherMapper.fromId(null)).isNull();
    }
}

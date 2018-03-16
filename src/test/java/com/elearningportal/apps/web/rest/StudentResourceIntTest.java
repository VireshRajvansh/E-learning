package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Student;
import com.elearningportal.apps.repository.StudentRepository;
import com.elearningportal.apps.repository.search.StudentSearchRepository;
import com.elearningportal.apps.service.dto.StudentDTO;
import com.elearningportal.apps.service.mapper.StudentMapper;
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
 * Test class for the StudentResource REST controller.
 *
 * @see StudentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class StudentResourceIntTest {

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
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private StudentSearchRepository studentSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStudentMockMvc;

    private Student student;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentResource studentResource = new StudentResource(studentRepository, studentMapper, studentSearchRepository);
        this.restStudentMockMvc = MockMvcBuilders.standaloneSetup(studentResource)
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
    public static Student createEntity(EntityManager em) {
        Student student = new Student()
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
        return student;
    }

    @Before
    public void initTest() {
        studentSearchRepository.deleteAll();
        student = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudent() throws Exception {
        int databaseSizeBeforeCreate = studentRepository.findAll().size();

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(student);
        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isCreated());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeCreate + 1);
        Student testStudent = studentList.get(studentList.size() - 1);
        assertThat(testStudent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStudent.getAbout()).isEqualTo(DEFAULT_ABOUT);
        assertThat(testStudent.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testStudent.getCollegeYear()).isEqualTo(DEFAULT_COLLEGE_YEAR);
        assertThat(testStudent.getDob()).isEqualTo(DEFAULT_DOB);
        assertThat(testStudent.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testStudent.getAlternativeMobile()).isEqualTo(DEFAULT_ALTERNATIVE_MOBILE);
        assertThat(testStudent.isPremium()).isEqualTo(DEFAULT_PREMIUM);
        assertThat(testStudent.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testStudent.getLanguagesSpoken()).isEqualTo(DEFAULT_LANGUAGES_SPOKEN);
        assertThat(testStudent.getSlug()).isEqualTo(DEFAULT_SLUG);
        assertThat(testStudent.getPremiumTill()).isEqualTo(DEFAULT_PREMIUM_TILL);
        assertThat(testStudent.getReferenceCode()).isEqualTo(DEFAULT_REFERENCE_CODE);
        assertThat(testStudent.getSignUpByReferenceCode()).isEqualTo(DEFAULT_SIGN_UP_BY_REFERENCE_CODE);
        assertThat(testStudent.getWebsiteURL()).isEqualTo(DEFAULT_WEBSITE_URL);
        assertThat(testStudent.getTwitter()).isEqualTo(DEFAULT_TWITTER);
        assertThat(testStudent.getFacebook()).isEqualTo(DEFAULT_FACEBOOK);
        assertThat(testStudent.getGooglePlus()).isEqualTo(DEFAULT_GOOGLE_PLUS);
        assertThat(testStudent.getLinkedIn()).isEqualTo(DEFAULT_LINKED_IN);

        // Validate the Student in Elasticsearch
        Student studentEs = studentSearchRepository.findOne(testStudent.getId());
        assertThat(studentEs).isEqualToIgnoringGivenFields(testStudent);
    }

    @Test
    @Transactional
    public void createStudentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentRepository.findAll().size();

        // Create the Student with an existing ID
        student.setId(1L);
        StudentDTO studentDTO = studentMapper.toDto(student);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentRepository.findAll().size();
        // set the field null
        student.setName(null);

        // Create the Student, which fails.
        StudentDTO studentDTO = studentMapper.toDto(student);

        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSlugIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentRepository.findAll().size();
        // set the field null
        student.setSlug(null);

        // Create the Student, which fails.
        StudentDTO studentDTO = studentMapper.toDto(student);

        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStudents() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);

        // Get all the studentList
        restStudentMockMvc.perform(get("/api/students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(student.getId().intValue())))
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
    public void getStudent() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);

        // Get the student
        restStudentMockMvc.perform(get("/api/students/{id}", student.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(student.getId().intValue()))
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
    public void getNonExistingStudent() throws Exception {
        // Get the student
        restStudentMockMvc.perform(get("/api/students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudent() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);
        studentSearchRepository.save(student);
        int databaseSizeBeforeUpdate = studentRepository.findAll().size();

        // Update the student
        Student updatedStudent = studentRepository.findOne(student.getId());
        // Disconnect from session so that the updates on updatedStudent are not directly saved in db
        em.detach(updatedStudent);
        updatedStudent
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
        StudentDTO studentDTO = studentMapper.toDto(updatedStudent);

        restStudentMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isOk());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeUpdate);
        Student testStudent = studentList.get(studentList.size() - 1);
        assertThat(testStudent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStudent.getAbout()).isEqualTo(UPDATED_ABOUT);
        assertThat(testStudent.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testStudent.getCollegeYear()).isEqualTo(UPDATED_COLLEGE_YEAR);
        assertThat(testStudent.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testStudent.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testStudent.getAlternativeMobile()).isEqualTo(UPDATED_ALTERNATIVE_MOBILE);
        assertThat(testStudent.isPremium()).isEqualTo(UPDATED_PREMIUM);
        assertThat(testStudent.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testStudent.getLanguagesSpoken()).isEqualTo(UPDATED_LANGUAGES_SPOKEN);
        assertThat(testStudent.getSlug()).isEqualTo(UPDATED_SLUG);
        assertThat(testStudent.getPremiumTill()).isEqualTo(UPDATED_PREMIUM_TILL);
        assertThat(testStudent.getReferenceCode()).isEqualTo(UPDATED_REFERENCE_CODE);
        assertThat(testStudent.getSignUpByReferenceCode()).isEqualTo(UPDATED_SIGN_UP_BY_REFERENCE_CODE);
        assertThat(testStudent.getWebsiteURL()).isEqualTo(UPDATED_WEBSITE_URL);
        assertThat(testStudent.getTwitter()).isEqualTo(UPDATED_TWITTER);
        assertThat(testStudent.getFacebook()).isEqualTo(UPDATED_FACEBOOK);
        assertThat(testStudent.getGooglePlus()).isEqualTo(UPDATED_GOOGLE_PLUS);
        assertThat(testStudent.getLinkedIn()).isEqualTo(UPDATED_LINKED_IN);

        // Validate the Student in Elasticsearch
        Student studentEs = studentSearchRepository.findOne(testStudent.getId());
        assertThat(studentEs).isEqualToIgnoringGivenFields(testStudent);
    }

    @Test
    @Transactional
    public void updateNonExistingStudent() throws Exception {
        int databaseSizeBeforeUpdate = studentRepository.findAll().size();

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(student);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStudentMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isCreated());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStudent() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);
        studentSearchRepository.save(student);
        int databaseSizeBeforeDelete = studentRepository.findAll().size();

        // Get the student
        restStudentMockMvc.perform(delete("/api/students/{id}", student.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean studentExistsInEs = studentSearchRepository.exists(student.getId());
        assertThat(studentExistsInEs).isFalse();

        // Validate the database is empty
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStudent() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);
        studentSearchRepository.save(student);

        // Search the student
        restStudentMockMvc.perform(get("/api/_search/students?query=id:" + student.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(student.getId().intValue())))
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
        TestUtil.equalsVerifier(Student.class);
        Student student1 = new Student();
        student1.setId(1L);
        Student student2 = new Student();
        student2.setId(student1.getId());
        assertThat(student1).isEqualTo(student2);
        student2.setId(2L);
        assertThat(student1).isNotEqualTo(student2);
        student1.setId(null);
        assertThat(student1).isNotEqualTo(student2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentDTO.class);
        StudentDTO studentDTO1 = new StudentDTO();
        studentDTO1.setId(1L);
        StudentDTO studentDTO2 = new StudentDTO();
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
        studentDTO2.setId(studentDTO1.getId());
        assertThat(studentDTO1).isEqualTo(studentDTO2);
        studentDTO2.setId(2L);
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
        studentDTO1.setId(null);
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(studentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(studentMapper.fromId(null)).isNull();
    }
}

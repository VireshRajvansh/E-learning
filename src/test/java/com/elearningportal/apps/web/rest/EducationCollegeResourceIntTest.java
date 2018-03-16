package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.EducationCollege;
import com.elearningportal.apps.repository.EducationCollegeRepository;
import com.elearningportal.apps.repository.search.EducationCollegeSearchRepository;
import com.elearningportal.apps.service.dto.EducationCollegeDTO;
import com.elearningportal.apps.service.mapper.EducationCollegeMapper;
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
import java.util.List;

import static com.elearningportal.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EducationCollegeResource REST controller.
 *
 * @see EducationCollegeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class EducationCollegeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EducationCollegeRepository educationCollegeRepository;

    @Autowired
    private EducationCollegeMapper educationCollegeMapper;

    @Autowired
    private EducationCollegeSearchRepository educationCollegeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEducationCollegeMockMvc;

    private EducationCollege educationCollege;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EducationCollegeResource educationCollegeResource = new EducationCollegeResource(educationCollegeRepository, educationCollegeMapper, educationCollegeSearchRepository);
        this.restEducationCollegeMockMvc = MockMvcBuilders.standaloneSetup(educationCollegeResource)
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
    public static EducationCollege createEntity(EntityManager em) {
        EducationCollege educationCollege = new EducationCollege()
            .name(DEFAULT_NAME);
        return educationCollege;
    }

    @Before
    public void initTest() {
        educationCollegeSearchRepository.deleteAll();
        educationCollege = createEntity(em);
    }

    @Test
    @Transactional
    public void createEducationCollege() throws Exception {
        int databaseSizeBeforeCreate = educationCollegeRepository.findAll().size();

        // Create the EducationCollege
        EducationCollegeDTO educationCollegeDTO = educationCollegeMapper.toDto(educationCollege);
        restEducationCollegeMockMvc.perform(post("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollegeDTO)))
            .andExpect(status().isCreated());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeCreate + 1);
        EducationCollege testEducationCollege = educationCollegeList.get(educationCollegeList.size() - 1);
        assertThat(testEducationCollege.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the EducationCollege in Elasticsearch
        EducationCollege educationCollegeEs = educationCollegeSearchRepository.findOne(testEducationCollege.getId());
        assertThat(educationCollegeEs).isEqualToIgnoringGivenFields(testEducationCollege);
    }

    @Test
    @Transactional
    public void createEducationCollegeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = educationCollegeRepository.findAll().size();

        // Create the EducationCollege with an existing ID
        educationCollege.setId(1L);
        EducationCollegeDTO educationCollegeDTO = educationCollegeMapper.toDto(educationCollege);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEducationCollegeMockMvc.perform(post("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollegeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = educationCollegeRepository.findAll().size();
        // set the field null
        educationCollege.setName(null);

        // Create the EducationCollege, which fails.
        EducationCollegeDTO educationCollegeDTO = educationCollegeMapper.toDto(educationCollege);

        restEducationCollegeMockMvc.perform(post("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollegeDTO)))
            .andExpect(status().isBadRequest());

        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEducationColleges() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);

        // Get all the educationCollegeList
        restEducationCollegeMockMvc.perform(get("/api/education-colleges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(educationCollege.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getEducationCollege() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);

        // Get the educationCollege
        restEducationCollegeMockMvc.perform(get("/api/education-colleges/{id}", educationCollege.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(educationCollege.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEducationCollege() throws Exception {
        // Get the educationCollege
        restEducationCollegeMockMvc.perform(get("/api/education-colleges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEducationCollege() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);
        educationCollegeSearchRepository.save(educationCollege);
        int databaseSizeBeforeUpdate = educationCollegeRepository.findAll().size();

        // Update the educationCollege
        EducationCollege updatedEducationCollege = educationCollegeRepository.findOne(educationCollege.getId());
        // Disconnect from session so that the updates on updatedEducationCollege are not directly saved in db
        em.detach(updatedEducationCollege);
        updatedEducationCollege
            .name(UPDATED_NAME);
        EducationCollegeDTO educationCollegeDTO = educationCollegeMapper.toDto(updatedEducationCollege);

        restEducationCollegeMockMvc.perform(put("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollegeDTO)))
            .andExpect(status().isOk());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeUpdate);
        EducationCollege testEducationCollege = educationCollegeList.get(educationCollegeList.size() - 1);
        assertThat(testEducationCollege.getName()).isEqualTo(UPDATED_NAME);

        // Validate the EducationCollege in Elasticsearch
        EducationCollege educationCollegeEs = educationCollegeSearchRepository.findOne(testEducationCollege.getId());
        assertThat(educationCollegeEs).isEqualToIgnoringGivenFields(testEducationCollege);
    }

    @Test
    @Transactional
    public void updateNonExistingEducationCollege() throws Exception {
        int databaseSizeBeforeUpdate = educationCollegeRepository.findAll().size();

        // Create the EducationCollege
        EducationCollegeDTO educationCollegeDTO = educationCollegeMapper.toDto(educationCollege);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEducationCollegeMockMvc.perform(put("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollegeDTO)))
            .andExpect(status().isCreated());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEducationCollege() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);
        educationCollegeSearchRepository.save(educationCollege);
        int databaseSizeBeforeDelete = educationCollegeRepository.findAll().size();

        // Get the educationCollege
        restEducationCollegeMockMvc.perform(delete("/api/education-colleges/{id}", educationCollege.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean educationCollegeExistsInEs = educationCollegeSearchRepository.exists(educationCollege.getId());
        assertThat(educationCollegeExistsInEs).isFalse();

        // Validate the database is empty
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEducationCollege() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);
        educationCollegeSearchRepository.save(educationCollege);

        // Search the educationCollege
        restEducationCollegeMockMvc.perform(get("/api/_search/education-colleges?query=id:" + educationCollege.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(educationCollege.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EducationCollege.class);
        EducationCollege educationCollege1 = new EducationCollege();
        educationCollege1.setId(1L);
        EducationCollege educationCollege2 = new EducationCollege();
        educationCollege2.setId(educationCollege1.getId());
        assertThat(educationCollege1).isEqualTo(educationCollege2);
        educationCollege2.setId(2L);
        assertThat(educationCollege1).isNotEqualTo(educationCollege2);
        educationCollege1.setId(null);
        assertThat(educationCollege1).isNotEqualTo(educationCollege2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EducationCollegeDTO.class);
        EducationCollegeDTO educationCollegeDTO1 = new EducationCollegeDTO();
        educationCollegeDTO1.setId(1L);
        EducationCollegeDTO educationCollegeDTO2 = new EducationCollegeDTO();
        assertThat(educationCollegeDTO1).isNotEqualTo(educationCollegeDTO2);
        educationCollegeDTO2.setId(educationCollegeDTO1.getId());
        assertThat(educationCollegeDTO1).isEqualTo(educationCollegeDTO2);
        educationCollegeDTO2.setId(2L);
        assertThat(educationCollegeDTO1).isNotEqualTo(educationCollegeDTO2);
        educationCollegeDTO1.setId(null);
        assertThat(educationCollegeDTO1).isNotEqualTo(educationCollegeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(educationCollegeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(educationCollegeMapper.fromId(null)).isNull();
    }
}

package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Education;
import com.elearningportal.apps.repository.EducationRepository;
import com.elearningportal.apps.repository.search.EducationSearchRepository;
import com.elearningportal.apps.service.dto.EducationDTO;
import com.elearningportal.apps.service.mapper.EducationMapper;
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
 * Test class for the EducationResource REST controller.
 *
 * @see EducationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class EducationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private EducationMapper educationMapper;

    @Autowired
    private EducationSearchRepository educationSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEducationMockMvc;

    private Education education;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EducationResource educationResource = new EducationResource(educationRepository, educationMapper, educationSearchRepository);
        this.restEducationMockMvc = MockMvcBuilders.standaloneSetup(educationResource)
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
    public static Education createEntity(EntityManager em) {
        Education education = new Education()
            .name(DEFAULT_NAME);
        return education;
    }

    @Before
    public void initTest() {
        educationSearchRepository.deleteAll();
        education = createEntity(em);
    }

    @Test
    @Transactional
    public void createEducation() throws Exception {
        int databaseSizeBeforeCreate = educationRepository.findAll().size();

        // Create the Education
        EducationDTO educationDTO = educationMapper.toDto(education);
        restEducationMockMvc.perform(post("/api/educations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationDTO)))
            .andExpect(status().isCreated());

        // Validate the Education in the database
        List<Education> educationList = educationRepository.findAll();
        assertThat(educationList).hasSize(databaseSizeBeforeCreate + 1);
        Education testEducation = educationList.get(educationList.size() - 1);
        assertThat(testEducation.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Education in Elasticsearch
        Education educationEs = educationSearchRepository.findOne(testEducation.getId());
        assertThat(educationEs).isEqualToIgnoringGivenFields(testEducation);
    }

    @Test
    @Transactional
    public void createEducationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = educationRepository.findAll().size();

        // Create the Education with an existing ID
        education.setId(1L);
        EducationDTO educationDTO = educationMapper.toDto(education);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEducationMockMvc.perform(post("/api/educations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Education in the database
        List<Education> educationList = educationRepository.findAll();
        assertThat(educationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = educationRepository.findAll().size();
        // set the field null
        education.setName(null);

        // Create the Education, which fails.
        EducationDTO educationDTO = educationMapper.toDto(education);

        restEducationMockMvc.perform(post("/api/educations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationDTO)))
            .andExpect(status().isBadRequest());

        List<Education> educationList = educationRepository.findAll();
        assertThat(educationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEducations() throws Exception {
        // Initialize the database
        educationRepository.saveAndFlush(education);

        // Get all the educationList
        restEducationMockMvc.perform(get("/api/educations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(education.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getEducation() throws Exception {
        // Initialize the database
        educationRepository.saveAndFlush(education);

        // Get the education
        restEducationMockMvc.perform(get("/api/educations/{id}", education.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(education.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEducation() throws Exception {
        // Get the education
        restEducationMockMvc.perform(get("/api/educations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEducation() throws Exception {
        // Initialize the database
        educationRepository.saveAndFlush(education);
        educationSearchRepository.save(education);
        int databaseSizeBeforeUpdate = educationRepository.findAll().size();

        // Update the education
        Education updatedEducation = educationRepository.findOne(education.getId());
        // Disconnect from session so that the updates on updatedEducation are not directly saved in db
        em.detach(updatedEducation);
        updatedEducation
            .name(UPDATED_NAME);
        EducationDTO educationDTO = educationMapper.toDto(updatedEducation);

        restEducationMockMvc.perform(put("/api/educations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationDTO)))
            .andExpect(status().isOk());

        // Validate the Education in the database
        List<Education> educationList = educationRepository.findAll();
        assertThat(educationList).hasSize(databaseSizeBeforeUpdate);
        Education testEducation = educationList.get(educationList.size() - 1);
        assertThat(testEducation.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Education in Elasticsearch
        Education educationEs = educationSearchRepository.findOne(testEducation.getId());
        assertThat(educationEs).isEqualToIgnoringGivenFields(testEducation);
    }

    @Test
    @Transactional
    public void updateNonExistingEducation() throws Exception {
        int databaseSizeBeforeUpdate = educationRepository.findAll().size();

        // Create the Education
        EducationDTO educationDTO = educationMapper.toDto(education);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEducationMockMvc.perform(put("/api/educations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationDTO)))
            .andExpect(status().isCreated());

        // Validate the Education in the database
        List<Education> educationList = educationRepository.findAll();
        assertThat(educationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEducation() throws Exception {
        // Initialize the database
        educationRepository.saveAndFlush(education);
        educationSearchRepository.save(education);
        int databaseSizeBeforeDelete = educationRepository.findAll().size();

        // Get the education
        restEducationMockMvc.perform(delete("/api/educations/{id}", education.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean educationExistsInEs = educationSearchRepository.exists(education.getId());
        assertThat(educationExistsInEs).isFalse();

        // Validate the database is empty
        List<Education> educationList = educationRepository.findAll();
        assertThat(educationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEducation() throws Exception {
        // Initialize the database
        educationRepository.saveAndFlush(education);
        educationSearchRepository.save(education);

        // Search the education
        restEducationMockMvc.perform(get("/api/_search/educations?query=id:" + education.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(education.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Education.class);
        Education education1 = new Education();
        education1.setId(1L);
        Education education2 = new Education();
        education2.setId(education1.getId());
        assertThat(education1).isEqualTo(education2);
        education2.setId(2L);
        assertThat(education1).isNotEqualTo(education2);
        education1.setId(null);
        assertThat(education1).isNotEqualTo(education2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EducationDTO.class);
        EducationDTO educationDTO1 = new EducationDTO();
        educationDTO1.setId(1L);
        EducationDTO educationDTO2 = new EducationDTO();
        assertThat(educationDTO1).isNotEqualTo(educationDTO2);
        educationDTO2.setId(educationDTO1.getId());
        assertThat(educationDTO1).isEqualTo(educationDTO2);
        educationDTO2.setId(2L);
        assertThat(educationDTO1).isNotEqualTo(educationDTO2);
        educationDTO1.setId(null);
        assertThat(educationDTO1).isNotEqualTo(educationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(educationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(educationMapper.fromId(null)).isNull();
    }
}

package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Jobs;
import com.elearningportal.apps.repository.JobsRepository;
import com.elearningportal.apps.repository.search.JobsSearchRepository;
import com.elearningportal.apps.service.dto.JobsDTO;
import com.elearningportal.apps.service.mapper.JobsMapper;
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
 * Test class for the JobsResource REST controller.
 *
 * @see JobsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class JobsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_RUNON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_RUNON = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CRON_EXPRESS = "AAAAAAAAAA";
    private static final String UPDATED_CRON_EXPRESS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_COMPLETE = false;
    private static final Boolean UPDATED_IS_COMPLETE = true;

    private static final String DEFAULT_MSG = "AAAAAAAAAA";
    private static final String UPDATED_MSG = "BBBBBBBBBB";

    @Autowired
    private JobsRepository jobsRepository;

    @Autowired
    private JobsMapper jobsMapper;

    @Autowired
    private JobsSearchRepository jobsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJobsMockMvc;

    private Jobs jobs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobsResource jobsResource = new JobsResource(jobsRepository, jobsMapper, jobsSearchRepository);
        this.restJobsMockMvc = MockMvcBuilders.standaloneSetup(jobsResource)
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
    public static Jobs createEntity(EntityManager em) {
        Jobs jobs = new Jobs()
            .name(DEFAULT_NAME)
            .runon(DEFAULT_RUNON)
            .type(DEFAULT_TYPE)
            .cronExpress(DEFAULT_CRON_EXPRESS)
            .isComplete(DEFAULT_IS_COMPLETE)
            .msg(DEFAULT_MSG);
        return jobs;
    }

    @Before
    public void initTest() {
        jobsSearchRepository.deleteAll();
        jobs = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobs() throws Exception {
        int databaseSizeBeforeCreate = jobsRepository.findAll().size();

        // Create the Jobs
        JobsDTO jobsDTO = jobsMapper.toDto(jobs);
        restJobsMockMvc.perform(post("/api/jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobsDTO)))
            .andExpect(status().isCreated());

        // Validate the Jobs in the database
        List<Jobs> jobsList = jobsRepository.findAll();
        assertThat(jobsList).hasSize(databaseSizeBeforeCreate + 1);
        Jobs testJobs = jobsList.get(jobsList.size() - 1);
        assertThat(testJobs.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testJobs.getRunon()).isEqualTo(DEFAULT_RUNON);
        assertThat(testJobs.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testJobs.getCronExpress()).isEqualTo(DEFAULT_CRON_EXPRESS);
        assertThat(testJobs.isIsComplete()).isEqualTo(DEFAULT_IS_COMPLETE);
        assertThat(testJobs.getMsg()).isEqualTo(DEFAULT_MSG);

        // Validate the Jobs in Elasticsearch
        Jobs jobsEs = jobsSearchRepository.findOne(testJobs.getId());
        assertThat(jobsEs).isEqualToIgnoringGivenFields(testJobs);
    }

    @Test
    @Transactional
    public void createJobsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobsRepository.findAll().size();

        // Create the Jobs with an existing ID
        jobs.setId(1L);
        JobsDTO jobsDTO = jobsMapper.toDto(jobs);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobsMockMvc.perform(post("/api/jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Jobs in the database
        List<Jobs> jobsList = jobsRepository.findAll();
        assertThat(jobsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobs() throws Exception {
        // Initialize the database
        jobsRepository.saveAndFlush(jobs);

        // Get all the jobsList
        restJobsMockMvc.perform(get("/api/jobs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobs.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].runon").value(hasItem(DEFAULT_RUNON.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].cronExpress").value(hasItem(DEFAULT_CRON_EXPRESS.toString())))
            .andExpect(jsonPath("$.[*].isComplete").value(hasItem(DEFAULT_IS_COMPLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].msg").value(hasItem(DEFAULT_MSG.toString())));
    }

    @Test
    @Transactional
    public void getJobs() throws Exception {
        // Initialize the database
        jobsRepository.saveAndFlush(jobs);

        // Get the jobs
        restJobsMockMvc.perform(get("/api/jobs/{id}", jobs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobs.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.runon").value(DEFAULT_RUNON.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.cronExpress").value(DEFAULT_CRON_EXPRESS.toString()))
            .andExpect(jsonPath("$.isComplete").value(DEFAULT_IS_COMPLETE.booleanValue()))
            .andExpect(jsonPath("$.msg").value(DEFAULT_MSG.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJobs() throws Exception {
        // Get the jobs
        restJobsMockMvc.perform(get("/api/jobs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobs() throws Exception {
        // Initialize the database
        jobsRepository.saveAndFlush(jobs);
        jobsSearchRepository.save(jobs);
        int databaseSizeBeforeUpdate = jobsRepository.findAll().size();

        // Update the jobs
        Jobs updatedJobs = jobsRepository.findOne(jobs.getId());
        // Disconnect from session so that the updates on updatedJobs are not directly saved in db
        em.detach(updatedJobs);
        updatedJobs
            .name(UPDATED_NAME)
            .runon(UPDATED_RUNON)
            .type(UPDATED_TYPE)
            .cronExpress(UPDATED_CRON_EXPRESS)
            .isComplete(UPDATED_IS_COMPLETE)
            .msg(UPDATED_MSG);
        JobsDTO jobsDTO = jobsMapper.toDto(updatedJobs);

        restJobsMockMvc.perform(put("/api/jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobsDTO)))
            .andExpect(status().isOk());

        // Validate the Jobs in the database
        List<Jobs> jobsList = jobsRepository.findAll();
        assertThat(jobsList).hasSize(databaseSizeBeforeUpdate);
        Jobs testJobs = jobsList.get(jobsList.size() - 1);
        assertThat(testJobs.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testJobs.getRunon()).isEqualTo(UPDATED_RUNON);
        assertThat(testJobs.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testJobs.getCronExpress()).isEqualTo(UPDATED_CRON_EXPRESS);
        assertThat(testJobs.isIsComplete()).isEqualTo(UPDATED_IS_COMPLETE);
        assertThat(testJobs.getMsg()).isEqualTo(UPDATED_MSG);

        // Validate the Jobs in Elasticsearch
        Jobs jobsEs = jobsSearchRepository.findOne(testJobs.getId());
        assertThat(jobsEs).isEqualToIgnoringGivenFields(testJobs);
    }

    @Test
    @Transactional
    public void updateNonExistingJobs() throws Exception {
        int databaseSizeBeforeUpdate = jobsRepository.findAll().size();

        // Create the Jobs
        JobsDTO jobsDTO = jobsMapper.toDto(jobs);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJobsMockMvc.perform(put("/api/jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobsDTO)))
            .andExpect(status().isCreated());

        // Validate the Jobs in the database
        List<Jobs> jobsList = jobsRepository.findAll();
        assertThat(jobsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJobs() throws Exception {
        // Initialize the database
        jobsRepository.saveAndFlush(jobs);
        jobsSearchRepository.save(jobs);
        int databaseSizeBeforeDelete = jobsRepository.findAll().size();

        // Get the jobs
        restJobsMockMvc.perform(delete("/api/jobs/{id}", jobs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean jobsExistsInEs = jobsSearchRepository.exists(jobs.getId());
        assertThat(jobsExistsInEs).isFalse();

        // Validate the database is empty
        List<Jobs> jobsList = jobsRepository.findAll();
        assertThat(jobsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchJobs() throws Exception {
        // Initialize the database
        jobsRepository.saveAndFlush(jobs);
        jobsSearchRepository.save(jobs);

        // Search the jobs
        restJobsMockMvc.perform(get("/api/_search/jobs?query=id:" + jobs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobs.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].runon").value(hasItem(DEFAULT_RUNON.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].cronExpress").value(hasItem(DEFAULT_CRON_EXPRESS.toString())))
            .andExpect(jsonPath("$.[*].isComplete").value(hasItem(DEFAULT_IS_COMPLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].msg").value(hasItem(DEFAULT_MSG.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Jobs.class);
        Jobs jobs1 = new Jobs();
        jobs1.setId(1L);
        Jobs jobs2 = new Jobs();
        jobs2.setId(jobs1.getId());
        assertThat(jobs1).isEqualTo(jobs2);
        jobs2.setId(2L);
        assertThat(jobs1).isNotEqualTo(jobs2);
        jobs1.setId(null);
        assertThat(jobs1).isNotEqualTo(jobs2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobsDTO.class);
        JobsDTO jobsDTO1 = new JobsDTO();
        jobsDTO1.setId(1L);
        JobsDTO jobsDTO2 = new JobsDTO();
        assertThat(jobsDTO1).isNotEqualTo(jobsDTO2);
        jobsDTO2.setId(jobsDTO1.getId());
        assertThat(jobsDTO1).isEqualTo(jobsDTO2);
        jobsDTO2.setId(2L);
        assertThat(jobsDTO1).isNotEqualTo(jobsDTO2);
        jobsDTO1.setId(null);
        assertThat(jobsDTO1).isNotEqualTo(jobsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(jobsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(jobsMapper.fromId(null)).isNull();
    }
}

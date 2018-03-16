package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Services;
import com.elearningportal.apps.repository.ServicesRepository;
import com.elearningportal.apps.repository.search.ServicesSearchRepository;
import com.elearningportal.apps.service.dto.ServicesDTO;
import com.elearningportal.apps.service.mapper.ServicesMapper;
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
 * Test class for the ServicesResource REST controller.
 *
 * @see ServicesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class ServicesResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ServicesRepository servicesRepository;

    @Autowired
    private ServicesMapper servicesMapper;

    @Autowired
    private ServicesSearchRepository servicesSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServicesMockMvc;

    private Services services;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServicesResource servicesResource = new ServicesResource(servicesRepository, servicesMapper, servicesSearchRepository);
        this.restServicesMockMvc = MockMvcBuilders.standaloneSetup(servicesResource)
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
    public static Services createEntity(EntityManager em) {
        Services services = new Services()
            .name(DEFAULT_NAME);
        return services;
    }

    @Before
    public void initTest() {
        servicesSearchRepository.deleteAll();
        services = createEntity(em);
    }

    @Test
    @Transactional
    public void createServices() throws Exception {
        int databaseSizeBeforeCreate = servicesRepository.findAll().size();

        // Create the Services
        ServicesDTO servicesDTO = servicesMapper.toDto(services);
        restServicesMockMvc.perform(post("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicesDTO)))
            .andExpect(status().isCreated());

        // Validate the Services in the database
        List<Services> servicesList = servicesRepository.findAll();
        assertThat(servicesList).hasSize(databaseSizeBeforeCreate + 1);
        Services testServices = servicesList.get(servicesList.size() - 1);
        assertThat(testServices.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Services in Elasticsearch
        Services servicesEs = servicesSearchRepository.findOne(testServices.getId());
        assertThat(servicesEs).isEqualToIgnoringGivenFields(testServices);
    }

    @Test
    @Transactional
    public void createServicesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = servicesRepository.findAll().size();

        // Create the Services with an existing ID
        services.setId(1L);
        ServicesDTO servicesDTO = servicesMapper.toDto(services);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServicesMockMvc.perform(post("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Services in the database
        List<Services> servicesList = servicesRepository.findAll();
        assertThat(servicesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = servicesRepository.findAll().size();
        // set the field null
        services.setName(null);

        // Create the Services, which fails.
        ServicesDTO servicesDTO = servicesMapper.toDto(services);

        restServicesMockMvc.perform(post("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicesDTO)))
            .andExpect(status().isBadRequest());

        List<Services> servicesList = servicesRepository.findAll();
        assertThat(servicesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllServices() throws Exception {
        // Initialize the database
        servicesRepository.saveAndFlush(services);

        // Get all the servicesList
        restServicesMockMvc.perform(get("/api/services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(services.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getServices() throws Exception {
        // Initialize the database
        servicesRepository.saveAndFlush(services);

        // Get the services
        restServicesMockMvc.perform(get("/api/services/{id}", services.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(services.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServices() throws Exception {
        // Get the services
        restServicesMockMvc.perform(get("/api/services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServices() throws Exception {
        // Initialize the database
        servicesRepository.saveAndFlush(services);
        servicesSearchRepository.save(services);
        int databaseSizeBeforeUpdate = servicesRepository.findAll().size();

        // Update the services
        Services updatedServices = servicesRepository.findOne(services.getId());
        // Disconnect from session so that the updates on updatedServices are not directly saved in db
        em.detach(updatedServices);
        updatedServices
            .name(UPDATED_NAME);
        ServicesDTO servicesDTO = servicesMapper.toDto(updatedServices);

        restServicesMockMvc.perform(put("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicesDTO)))
            .andExpect(status().isOk());

        // Validate the Services in the database
        List<Services> servicesList = servicesRepository.findAll();
        assertThat(servicesList).hasSize(databaseSizeBeforeUpdate);
        Services testServices = servicesList.get(servicesList.size() - 1);
        assertThat(testServices.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Services in Elasticsearch
        Services servicesEs = servicesSearchRepository.findOne(testServices.getId());
        assertThat(servicesEs).isEqualToIgnoringGivenFields(testServices);
    }

    @Test
    @Transactional
    public void updateNonExistingServices() throws Exception {
        int databaseSizeBeforeUpdate = servicesRepository.findAll().size();

        // Create the Services
        ServicesDTO servicesDTO = servicesMapper.toDto(services);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServicesMockMvc.perform(put("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicesDTO)))
            .andExpect(status().isCreated());

        // Validate the Services in the database
        List<Services> servicesList = servicesRepository.findAll();
        assertThat(servicesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServices() throws Exception {
        // Initialize the database
        servicesRepository.saveAndFlush(services);
        servicesSearchRepository.save(services);
        int databaseSizeBeforeDelete = servicesRepository.findAll().size();

        // Get the services
        restServicesMockMvc.perform(delete("/api/services/{id}", services.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean servicesExistsInEs = servicesSearchRepository.exists(services.getId());
        assertThat(servicesExistsInEs).isFalse();

        // Validate the database is empty
        List<Services> servicesList = servicesRepository.findAll();
        assertThat(servicesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchServices() throws Exception {
        // Initialize the database
        servicesRepository.saveAndFlush(services);
        servicesSearchRepository.save(services);

        // Search the services
        restServicesMockMvc.perform(get("/api/_search/services?query=id:" + services.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(services.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Services.class);
        Services services1 = new Services();
        services1.setId(1L);
        Services services2 = new Services();
        services2.setId(services1.getId());
        assertThat(services1).isEqualTo(services2);
        services2.setId(2L);
        assertThat(services1).isNotEqualTo(services2);
        services1.setId(null);
        assertThat(services1).isNotEqualTo(services2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServicesDTO.class);
        ServicesDTO servicesDTO1 = new ServicesDTO();
        servicesDTO1.setId(1L);
        ServicesDTO servicesDTO2 = new ServicesDTO();
        assertThat(servicesDTO1).isNotEqualTo(servicesDTO2);
        servicesDTO2.setId(servicesDTO1.getId());
        assertThat(servicesDTO1).isEqualTo(servicesDTO2);
        servicesDTO2.setId(2L);
        assertThat(servicesDTO1).isNotEqualTo(servicesDTO2);
        servicesDTO1.setId(null);
        assertThat(servicesDTO1).isNotEqualTo(servicesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(servicesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(servicesMapper.fromId(null)).isNull();
    }
}

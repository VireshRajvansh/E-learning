package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.TaxRate;
import com.elearningportal.apps.repository.TaxRateRepository;
import com.elearningportal.apps.repository.search.TaxRateSearchRepository;
import com.elearningportal.apps.service.dto.TaxRateDTO;
import com.elearningportal.apps.service.mapper.TaxRateMapper;
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
import java.math.BigDecimal;
import java.util.List;

import static com.elearningportal.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TaxRateResource REST controller.
 *
 * @see TaxRateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class TaxRateResourceIntTest {

    private static final String DEFAULT_DISPLAY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAY_NAME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_TOTAL_TAX_IN_PCT = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_TAX_IN_PCT = new BigDecimal(2);

    private static final Integer DEFAULT_STATE_ID = 1;
    private static final Integer UPDATED_STATE_ID = 2;

    @Autowired
    private TaxRateRepository taxRateRepository;

    @Autowired
    private TaxRateMapper taxRateMapper;

    @Autowired
    private TaxRateSearchRepository taxRateSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTaxRateMockMvc;

    private TaxRate taxRate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaxRateResource taxRateResource = new TaxRateResource(taxRateRepository, taxRateMapper, taxRateSearchRepository);
        this.restTaxRateMockMvc = MockMvcBuilders.standaloneSetup(taxRateResource)
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
    public static TaxRate createEntity(EntityManager em) {
        TaxRate taxRate = new TaxRate()
            .displayName(DEFAULT_DISPLAY_NAME)
            .totalTaxInPct(DEFAULT_TOTAL_TAX_IN_PCT)
            .stateId(DEFAULT_STATE_ID);
        return taxRate;
    }

    @Before
    public void initTest() {
        taxRateSearchRepository.deleteAll();
        taxRate = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaxRate() throws Exception {
        int databaseSizeBeforeCreate = taxRateRepository.findAll().size();

        // Create the TaxRate
        TaxRateDTO taxRateDTO = taxRateMapper.toDto(taxRate);
        restTaxRateMockMvc.perform(post("/api/tax-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taxRateDTO)))
            .andExpect(status().isCreated());

        // Validate the TaxRate in the database
        List<TaxRate> taxRateList = taxRateRepository.findAll();
        assertThat(taxRateList).hasSize(databaseSizeBeforeCreate + 1);
        TaxRate testTaxRate = taxRateList.get(taxRateList.size() - 1);
        assertThat(testTaxRate.getDisplayName()).isEqualTo(DEFAULT_DISPLAY_NAME);
        assertThat(testTaxRate.getTotalTaxInPct()).isEqualTo(DEFAULT_TOTAL_TAX_IN_PCT);
        assertThat(testTaxRate.getStateId()).isEqualTo(DEFAULT_STATE_ID);

        // Validate the TaxRate in Elasticsearch
        TaxRate taxRateEs = taxRateSearchRepository.findOne(testTaxRate.getId());
        assertThat(taxRateEs).isEqualToIgnoringGivenFields(testTaxRate);
    }

    @Test
    @Transactional
    public void createTaxRateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taxRateRepository.findAll().size();

        // Create the TaxRate with an existing ID
        taxRate.setId(1L);
        TaxRateDTO taxRateDTO = taxRateMapper.toDto(taxRate);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaxRateMockMvc.perform(post("/api/tax-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taxRateDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TaxRate in the database
        List<TaxRate> taxRateList = taxRateRepository.findAll();
        assertThat(taxRateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTaxRates() throws Exception {
        // Initialize the database
        taxRateRepository.saveAndFlush(taxRate);

        // Get all the taxRateList
        restTaxRateMockMvc.perform(get("/api/tax-rates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taxRate.getId().intValue())))
            .andExpect(jsonPath("$.[*].displayName").value(hasItem(DEFAULT_DISPLAY_NAME.toString())))
            .andExpect(jsonPath("$.[*].totalTaxInPct").value(hasItem(DEFAULT_TOTAL_TAX_IN_PCT.intValue())))
            .andExpect(jsonPath("$.[*].stateId").value(hasItem(DEFAULT_STATE_ID)));
    }

    @Test
    @Transactional
    public void getTaxRate() throws Exception {
        // Initialize the database
        taxRateRepository.saveAndFlush(taxRate);

        // Get the taxRate
        restTaxRateMockMvc.perform(get("/api/tax-rates/{id}", taxRate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taxRate.getId().intValue()))
            .andExpect(jsonPath("$.displayName").value(DEFAULT_DISPLAY_NAME.toString()))
            .andExpect(jsonPath("$.totalTaxInPct").value(DEFAULT_TOTAL_TAX_IN_PCT.intValue()))
            .andExpect(jsonPath("$.stateId").value(DEFAULT_STATE_ID));
    }

    @Test
    @Transactional
    public void getNonExistingTaxRate() throws Exception {
        // Get the taxRate
        restTaxRateMockMvc.perform(get("/api/tax-rates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaxRate() throws Exception {
        // Initialize the database
        taxRateRepository.saveAndFlush(taxRate);
        taxRateSearchRepository.save(taxRate);
        int databaseSizeBeforeUpdate = taxRateRepository.findAll().size();

        // Update the taxRate
        TaxRate updatedTaxRate = taxRateRepository.findOne(taxRate.getId());
        // Disconnect from session so that the updates on updatedTaxRate are not directly saved in db
        em.detach(updatedTaxRate);
        updatedTaxRate
            .displayName(UPDATED_DISPLAY_NAME)
            .totalTaxInPct(UPDATED_TOTAL_TAX_IN_PCT)
            .stateId(UPDATED_STATE_ID);
        TaxRateDTO taxRateDTO = taxRateMapper.toDto(updatedTaxRate);

        restTaxRateMockMvc.perform(put("/api/tax-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taxRateDTO)))
            .andExpect(status().isOk());

        // Validate the TaxRate in the database
        List<TaxRate> taxRateList = taxRateRepository.findAll();
        assertThat(taxRateList).hasSize(databaseSizeBeforeUpdate);
        TaxRate testTaxRate = taxRateList.get(taxRateList.size() - 1);
        assertThat(testTaxRate.getDisplayName()).isEqualTo(UPDATED_DISPLAY_NAME);
        assertThat(testTaxRate.getTotalTaxInPct()).isEqualTo(UPDATED_TOTAL_TAX_IN_PCT);
        assertThat(testTaxRate.getStateId()).isEqualTo(UPDATED_STATE_ID);

        // Validate the TaxRate in Elasticsearch
        TaxRate taxRateEs = taxRateSearchRepository.findOne(testTaxRate.getId());
        assertThat(taxRateEs).isEqualToIgnoringGivenFields(testTaxRate);
    }

    @Test
    @Transactional
    public void updateNonExistingTaxRate() throws Exception {
        int databaseSizeBeforeUpdate = taxRateRepository.findAll().size();

        // Create the TaxRate
        TaxRateDTO taxRateDTO = taxRateMapper.toDto(taxRate);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTaxRateMockMvc.perform(put("/api/tax-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taxRateDTO)))
            .andExpect(status().isCreated());

        // Validate the TaxRate in the database
        List<TaxRate> taxRateList = taxRateRepository.findAll();
        assertThat(taxRateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTaxRate() throws Exception {
        // Initialize the database
        taxRateRepository.saveAndFlush(taxRate);
        taxRateSearchRepository.save(taxRate);
        int databaseSizeBeforeDelete = taxRateRepository.findAll().size();

        // Get the taxRate
        restTaxRateMockMvc.perform(delete("/api/tax-rates/{id}", taxRate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean taxRateExistsInEs = taxRateSearchRepository.exists(taxRate.getId());
        assertThat(taxRateExistsInEs).isFalse();

        // Validate the database is empty
        List<TaxRate> taxRateList = taxRateRepository.findAll();
        assertThat(taxRateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTaxRate() throws Exception {
        // Initialize the database
        taxRateRepository.saveAndFlush(taxRate);
        taxRateSearchRepository.save(taxRate);

        // Search the taxRate
        restTaxRateMockMvc.perform(get("/api/_search/tax-rates?query=id:" + taxRate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taxRate.getId().intValue())))
            .andExpect(jsonPath("$.[*].displayName").value(hasItem(DEFAULT_DISPLAY_NAME.toString())))
            .andExpect(jsonPath("$.[*].totalTaxInPct").value(hasItem(DEFAULT_TOTAL_TAX_IN_PCT.intValue())))
            .andExpect(jsonPath("$.[*].stateId").value(hasItem(DEFAULT_STATE_ID)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaxRate.class);
        TaxRate taxRate1 = new TaxRate();
        taxRate1.setId(1L);
        TaxRate taxRate2 = new TaxRate();
        taxRate2.setId(taxRate1.getId());
        assertThat(taxRate1).isEqualTo(taxRate2);
        taxRate2.setId(2L);
        assertThat(taxRate1).isNotEqualTo(taxRate2);
        taxRate1.setId(null);
        assertThat(taxRate1).isNotEqualTo(taxRate2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaxRateDTO.class);
        TaxRateDTO taxRateDTO1 = new TaxRateDTO();
        taxRateDTO1.setId(1L);
        TaxRateDTO taxRateDTO2 = new TaxRateDTO();
        assertThat(taxRateDTO1).isNotEqualTo(taxRateDTO2);
        taxRateDTO2.setId(taxRateDTO1.getId());
        assertThat(taxRateDTO1).isEqualTo(taxRateDTO2);
        taxRateDTO2.setId(2L);
        assertThat(taxRateDTO1).isNotEqualTo(taxRateDTO2);
        taxRateDTO1.setId(null);
        assertThat(taxRateDTO1).isNotEqualTo(taxRateDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(taxRateMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(taxRateMapper.fromId(null)).isNull();
    }
}

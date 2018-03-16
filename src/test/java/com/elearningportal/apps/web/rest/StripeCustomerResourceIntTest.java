package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.StripeCustomer;
import com.elearningportal.apps.repository.StripeCustomerRepository;
import com.elearningportal.apps.repository.search.StripeCustomerSearchRepository;
import com.elearningportal.apps.service.dto.StripeCustomerDTO;
import com.elearningportal.apps.service.mapper.StripeCustomerMapper;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.elearningportal.apps.web.rest.TestUtil.sameInstant;
import static com.elearningportal.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StripeCustomerResource REST controller.
 *
 * @see StripeCustomerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class StripeCustomerResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CURRENCY = "AAA";
    private static final String UPDATED_CURRENCY = "BBB";

    private static final String DEFAULT_STRIPE_CUSTOMER_ID = "AAAAAAAAAA";
    private static final String UPDATED_STRIPE_CUSTOMER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_STRIPE_SUBSCRIPTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_STRIPE_SUBSCRIPTION_ID = "BBBBBBBBBB";

    private static final String DEFAULT_STRIPE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STRIPE_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_PLAN = "AAAAAAAAAA";
    private static final String UPDATED_PLAN = "BBBBBBBBBB";

    private static final String DEFAULT_CC_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_CC_BRAND = "BBBBBBBBBB";

    private static final Integer DEFAULT_CC_LAST_4 = 10;
    private static final Integer UPDATED_CC_LAST_4 = 9;

    private static final String DEFAULT_EXP_MONTH = "AAAAAAAAAA";
    private static final String UPDATED_EXP_MONTH = "BBBBBBBBBB";

    private static final String DEFAULT_EXP_YEAR = "AAAAAAAAAA";
    private static final String UPDATED_EXP_YEAR = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_CANCELLED = false;
    private static final Boolean UPDATED_IS_CANCELLED = true;

    private static final String DEFAULT_CARD_ID = "AAAAAAAAAA";
    private static final String UPDATED_CARD_ID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_EXPECTED_EXPIRY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPECTED_EXPIRY_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private StripeCustomerRepository stripeCustomerRepository;

    @Autowired
    private StripeCustomerMapper stripeCustomerMapper;

    @Autowired
    private StripeCustomerSearchRepository stripeCustomerSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStripeCustomerMockMvc;

    private StripeCustomer stripeCustomer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StripeCustomerResource stripeCustomerResource = new StripeCustomerResource(stripeCustomerRepository, stripeCustomerMapper, stripeCustomerSearchRepository);
        this.restStripeCustomerMockMvc = MockMvcBuilders.standaloneSetup(stripeCustomerResource)
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
    public static StripeCustomer createEntity(EntityManager em) {
        StripeCustomer stripeCustomer = new StripeCustomer()
            .name(DEFAULT_NAME)
            .created(DEFAULT_CREATED)
            .email(DEFAULT_EMAIL)
            .currency(DEFAULT_CURRENCY)
            .stripeCustomerId(DEFAULT_STRIPE_CUSTOMER_ID)
            .stripeSubscriptionId(DEFAULT_STRIPE_SUBSCRIPTION_ID)
            .stripeStatus(DEFAULT_STRIPE_STATUS)
            .plan(DEFAULT_PLAN)
            .ccBrand(DEFAULT_CC_BRAND)
            .ccLast4(DEFAULT_CC_LAST_4)
            .expMonth(DEFAULT_EXP_MONTH)
            .expYear(DEFAULT_EXP_YEAR)
            .isCancelled(DEFAULT_IS_CANCELLED)
            .cardId(DEFAULT_CARD_ID)
            .expectedExpiryDate(DEFAULT_EXPECTED_EXPIRY_DATE);
        return stripeCustomer;
    }

    @Before
    public void initTest() {
        stripeCustomerSearchRepository.deleteAll();
        stripeCustomer = createEntity(em);
    }

    @Test
    @Transactional
    public void createStripeCustomer() throws Exception {
        int databaseSizeBeforeCreate = stripeCustomerRepository.findAll().size();

        // Create the StripeCustomer
        StripeCustomerDTO stripeCustomerDTO = stripeCustomerMapper.toDto(stripeCustomer);
        restStripeCustomerMockMvc.perform(post("/api/stripe-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripeCustomerDTO)))
            .andExpect(status().isCreated());

        // Validate the StripeCustomer in the database
        List<StripeCustomer> stripeCustomerList = stripeCustomerRepository.findAll();
        assertThat(stripeCustomerList).hasSize(databaseSizeBeforeCreate + 1);
        StripeCustomer testStripeCustomer = stripeCustomerList.get(stripeCustomerList.size() - 1);
        assertThat(testStripeCustomer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStripeCustomer.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testStripeCustomer.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testStripeCustomer.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testStripeCustomer.getStripeCustomerId()).isEqualTo(DEFAULT_STRIPE_CUSTOMER_ID);
        assertThat(testStripeCustomer.getStripeSubscriptionId()).isEqualTo(DEFAULT_STRIPE_SUBSCRIPTION_ID);
        assertThat(testStripeCustomer.getStripeStatus()).isEqualTo(DEFAULT_STRIPE_STATUS);
        assertThat(testStripeCustomer.getPlan()).isEqualTo(DEFAULT_PLAN);
        assertThat(testStripeCustomer.getCcBrand()).isEqualTo(DEFAULT_CC_BRAND);
        assertThat(testStripeCustomer.getCcLast4()).isEqualTo(DEFAULT_CC_LAST_4);
        assertThat(testStripeCustomer.getExpMonth()).isEqualTo(DEFAULT_EXP_MONTH);
        assertThat(testStripeCustomer.getExpYear()).isEqualTo(DEFAULT_EXP_YEAR);
        assertThat(testStripeCustomer.isIsCancelled()).isEqualTo(DEFAULT_IS_CANCELLED);
        assertThat(testStripeCustomer.getCardId()).isEqualTo(DEFAULT_CARD_ID);
        assertThat(testStripeCustomer.getExpectedExpiryDate()).isEqualTo(DEFAULT_EXPECTED_EXPIRY_DATE);

        // Validate the StripeCustomer in Elasticsearch
        StripeCustomer stripeCustomerEs = stripeCustomerSearchRepository.findOne(testStripeCustomer.getId());
        assertThat(testStripeCustomer.getCreated()).isEqualTo(testStripeCustomer.getCreated());
        assertThat(stripeCustomerEs).isEqualToIgnoringGivenFields(testStripeCustomer, "created");
    }

    @Test
    @Transactional
    public void createStripeCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stripeCustomerRepository.findAll().size();

        // Create the StripeCustomer with an existing ID
        stripeCustomer.setId(1L);
        StripeCustomerDTO stripeCustomerDTO = stripeCustomerMapper.toDto(stripeCustomer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStripeCustomerMockMvc.perform(post("/api/stripe-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripeCustomerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StripeCustomer in the database
        List<StripeCustomer> stripeCustomerList = stripeCustomerRepository.findAll();
        assertThat(stripeCustomerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStripeCustomers() throws Exception {
        // Initialize the database
        stripeCustomerRepository.saveAndFlush(stripeCustomer);

        // Get all the stripeCustomerList
        restStripeCustomerMockMvc.perform(get("/api/stripe-customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stripeCustomer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].stripeCustomerId").value(hasItem(DEFAULT_STRIPE_CUSTOMER_ID.toString())))
            .andExpect(jsonPath("$.[*].stripeSubscriptionId").value(hasItem(DEFAULT_STRIPE_SUBSCRIPTION_ID.toString())))
            .andExpect(jsonPath("$.[*].stripeStatus").value(hasItem(DEFAULT_STRIPE_STATUS.toString())))
            .andExpect(jsonPath("$.[*].plan").value(hasItem(DEFAULT_PLAN.toString())))
            .andExpect(jsonPath("$.[*].ccBrand").value(hasItem(DEFAULT_CC_BRAND.toString())))
            .andExpect(jsonPath("$.[*].ccLast4").value(hasItem(DEFAULT_CC_LAST_4)))
            .andExpect(jsonPath("$.[*].expMonth").value(hasItem(DEFAULT_EXP_MONTH.toString())))
            .andExpect(jsonPath("$.[*].expYear").value(hasItem(DEFAULT_EXP_YEAR.toString())))
            .andExpect(jsonPath("$.[*].isCancelled").value(hasItem(DEFAULT_IS_CANCELLED.booleanValue())))
            .andExpect(jsonPath("$.[*].cardId").value(hasItem(DEFAULT_CARD_ID.toString())))
            .andExpect(jsonPath("$.[*].expectedExpiryDate").value(hasItem(DEFAULT_EXPECTED_EXPIRY_DATE.toString())));
    }

    @Test
    @Transactional
    public void getStripeCustomer() throws Exception {
        // Initialize the database
        stripeCustomerRepository.saveAndFlush(stripeCustomer);

        // Get the stripeCustomer
        restStripeCustomerMockMvc.perform(get("/api/stripe-customers/{id}", stripeCustomer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stripeCustomer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()))
            .andExpect(jsonPath("$.stripeCustomerId").value(DEFAULT_STRIPE_CUSTOMER_ID.toString()))
            .andExpect(jsonPath("$.stripeSubscriptionId").value(DEFAULT_STRIPE_SUBSCRIPTION_ID.toString()))
            .andExpect(jsonPath("$.stripeStatus").value(DEFAULT_STRIPE_STATUS.toString()))
            .andExpect(jsonPath("$.plan").value(DEFAULT_PLAN.toString()))
            .andExpect(jsonPath("$.ccBrand").value(DEFAULT_CC_BRAND.toString()))
            .andExpect(jsonPath("$.ccLast4").value(DEFAULT_CC_LAST_4))
            .andExpect(jsonPath("$.expMonth").value(DEFAULT_EXP_MONTH.toString()))
            .andExpect(jsonPath("$.expYear").value(DEFAULT_EXP_YEAR.toString()))
            .andExpect(jsonPath("$.isCancelled").value(DEFAULT_IS_CANCELLED.booleanValue()))
            .andExpect(jsonPath("$.cardId").value(DEFAULT_CARD_ID.toString()))
            .andExpect(jsonPath("$.expectedExpiryDate").value(DEFAULT_EXPECTED_EXPIRY_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStripeCustomer() throws Exception {
        // Get the stripeCustomer
        restStripeCustomerMockMvc.perform(get("/api/stripe-customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStripeCustomer() throws Exception {
        // Initialize the database
        stripeCustomerRepository.saveAndFlush(stripeCustomer);
        stripeCustomerSearchRepository.save(stripeCustomer);
        int databaseSizeBeforeUpdate = stripeCustomerRepository.findAll().size();

        // Update the stripeCustomer
        StripeCustomer updatedStripeCustomer = stripeCustomerRepository.findOne(stripeCustomer.getId());
        // Disconnect from session so that the updates on updatedStripeCustomer are not directly saved in db
        em.detach(updatedStripeCustomer);
        updatedStripeCustomer
            .name(UPDATED_NAME)
            .created(UPDATED_CREATED)
            .email(UPDATED_EMAIL)
            .currency(UPDATED_CURRENCY)
            .stripeCustomerId(UPDATED_STRIPE_CUSTOMER_ID)
            .stripeSubscriptionId(UPDATED_STRIPE_SUBSCRIPTION_ID)
            .stripeStatus(UPDATED_STRIPE_STATUS)
            .plan(UPDATED_PLAN)
            .ccBrand(UPDATED_CC_BRAND)
            .ccLast4(UPDATED_CC_LAST_4)
            .expMonth(UPDATED_EXP_MONTH)
            .expYear(UPDATED_EXP_YEAR)
            .isCancelled(UPDATED_IS_CANCELLED)
            .cardId(UPDATED_CARD_ID)
            .expectedExpiryDate(UPDATED_EXPECTED_EXPIRY_DATE);
        StripeCustomerDTO stripeCustomerDTO = stripeCustomerMapper.toDto(updatedStripeCustomer);

        restStripeCustomerMockMvc.perform(put("/api/stripe-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripeCustomerDTO)))
            .andExpect(status().isOk());

        // Validate the StripeCustomer in the database
        List<StripeCustomer> stripeCustomerList = stripeCustomerRepository.findAll();
        assertThat(stripeCustomerList).hasSize(databaseSizeBeforeUpdate);
        StripeCustomer testStripeCustomer = stripeCustomerList.get(stripeCustomerList.size() - 1);
        assertThat(testStripeCustomer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStripeCustomer.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testStripeCustomer.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testStripeCustomer.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testStripeCustomer.getStripeCustomerId()).isEqualTo(UPDATED_STRIPE_CUSTOMER_ID);
        assertThat(testStripeCustomer.getStripeSubscriptionId()).isEqualTo(UPDATED_STRIPE_SUBSCRIPTION_ID);
        assertThat(testStripeCustomer.getStripeStatus()).isEqualTo(UPDATED_STRIPE_STATUS);
        assertThat(testStripeCustomer.getPlan()).isEqualTo(UPDATED_PLAN);
        assertThat(testStripeCustomer.getCcBrand()).isEqualTo(UPDATED_CC_BRAND);
        assertThat(testStripeCustomer.getCcLast4()).isEqualTo(UPDATED_CC_LAST_4);
        assertThat(testStripeCustomer.getExpMonth()).isEqualTo(UPDATED_EXP_MONTH);
        assertThat(testStripeCustomer.getExpYear()).isEqualTo(UPDATED_EXP_YEAR);
        assertThat(testStripeCustomer.isIsCancelled()).isEqualTo(UPDATED_IS_CANCELLED);
        assertThat(testStripeCustomer.getCardId()).isEqualTo(UPDATED_CARD_ID);
        assertThat(testStripeCustomer.getExpectedExpiryDate()).isEqualTo(UPDATED_EXPECTED_EXPIRY_DATE);

        // Validate the StripeCustomer in Elasticsearch
        StripeCustomer stripeCustomerEs = stripeCustomerSearchRepository.findOne(testStripeCustomer.getId());
        assertThat(testStripeCustomer.getCreated()).isEqualTo(testStripeCustomer.getCreated());
        assertThat(stripeCustomerEs).isEqualToIgnoringGivenFields(testStripeCustomer, "created");
    }

    @Test
    @Transactional
    public void updateNonExistingStripeCustomer() throws Exception {
        int databaseSizeBeforeUpdate = stripeCustomerRepository.findAll().size();

        // Create the StripeCustomer
        StripeCustomerDTO stripeCustomerDTO = stripeCustomerMapper.toDto(stripeCustomer);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStripeCustomerMockMvc.perform(put("/api/stripe-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripeCustomerDTO)))
            .andExpect(status().isCreated());

        // Validate the StripeCustomer in the database
        List<StripeCustomer> stripeCustomerList = stripeCustomerRepository.findAll();
        assertThat(stripeCustomerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStripeCustomer() throws Exception {
        // Initialize the database
        stripeCustomerRepository.saveAndFlush(stripeCustomer);
        stripeCustomerSearchRepository.save(stripeCustomer);
        int databaseSizeBeforeDelete = stripeCustomerRepository.findAll().size();

        // Get the stripeCustomer
        restStripeCustomerMockMvc.perform(delete("/api/stripe-customers/{id}", stripeCustomer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean stripeCustomerExistsInEs = stripeCustomerSearchRepository.exists(stripeCustomer.getId());
        assertThat(stripeCustomerExistsInEs).isFalse();

        // Validate the database is empty
        List<StripeCustomer> stripeCustomerList = stripeCustomerRepository.findAll();
        assertThat(stripeCustomerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStripeCustomer() throws Exception {
        // Initialize the database
        stripeCustomerRepository.saveAndFlush(stripeCustomer);
        stripeCustomerSearchRepository.save(stripeCustomer);

        // Search the stripeCustomer
        restStripeCustomerMockMvc.perform(get("/api/_search/stripe-customers?query=id:" + stripeCustomer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stripeCustomer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].stripeCustomerId").value(hasItem(DEFAULT_STRIPE_CUSTOMER_ID.toString())))
            .andExpect(jsonPath("$.[*].stripeSubscriptionId").value(hasItem(DEFAULT_STRIPE_SUBSCRIPTION_ID.toString())))
            .andExpect(jsonPath("$.[*].stripeStatus").value(hasItem(DEFAULT_STRIPE_STATUS.toString())))
            .andExpect(jsonPath("$.[*].plan").value(hasItem(DEFAULT_PLAN.toString())))
            .andExpect(jsonPath("$.[*].ccBrand").value(hasItem(DEFAULT_CC_BRAND.toString())))
            .andExpect(jsonPath("$.[*].ccLast4").value(hasItem(DEFAULT_CC_LAST_4)))
            .andExpect(jsonPath("$.[*].expMonth").value(hasItem(DEFAULT_EXP_MONTH.toString())))
            .andExpect(jsonPath("$.[*].expYear").value(hasItem(DEFAULT_EXP_YEAR.toString())))
            .andExpect(jsonPath("$.[*].isCancelled").value(hasItem(DEFAULT_IS_CANCELLED.booleanValue())))
            .andExpect(jsonPath("$.[*].cardId").value(hasItem(DEFAULT_CARD_ID.toString())))
            .andExpect(jsonPath("$.[*].expectedExpiryDate").value(hasItem(DEFAULT_EXPECTED_EXPIRY_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StripeCustomer.class);
        StripeCustomer stripeCustomer1 = new StripeCustomer();
        stripeCustomer1.setId(1L);
        StripeCustomer stripeCustomer2 = new StripeCustomer();
        stripeCustomer2.setId(stripeCustomer1.getId());
        assertThat(stripeCustomer1).isEqualTo(stripeCustomer2);
        stripeCustomer2.setId(2L);
        assertThat(stripeCustomer1).isNotEqualTo(stripeCustomer2);
        stripeCustomer1.setId(null);
        assertThat(stripeCustomer1).isNotEqualTo(stripeCustomer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StripeCustomerDTO.class);
        StripeCustomerDTO stripeCustomerDTO1 = new StripeCustomerDTO();
        stripeCustomerDTO1.setId(1L);
        StripeCustomerDTO stripeCustomerDTO2 = new StripeCustomerDTO();
        assertThat(stripeCustomerDTO1).isNotEqualTo(stripeCustomerDTO2);
        stripeCustomerDTO2.setId(stripeCustomerDTO1.getId());
        assertThat(stripeCustomerDTO1).isEqualTo(stripeCustomerDTO2);
        stripeCustomerDTO2.setId(2L);
        assertThat(stripeCustomerDTO1).isNotEqualTo(stripeCustomerDTO2);
        stripeCustomerDTO1.setId(null);
        assertThat(stripeCustomerDTO1).isNotEqualTo(stripeCustomerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(stripeCustomerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(stripeCustomerMapper.fromId(null)).isNull();
    }
}

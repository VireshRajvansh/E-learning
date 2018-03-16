package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.StripePayment;
import com.elearningportal.apps.repository.StripePaymentRepository;
import com.elearningportal.apps.repository.search.StripePaymentSearchRepository;
import com.elearningportal.apps.service.dto.StripePaymentDTO;
import com.elearningportal.apps.service.mapper.StripePaymentMapper;
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
 * Test class for the StripePaymentResource REST controller.
 *
 * @see StripePaymentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class StripePaymentResourceIntTest {

    private static final String DEFAULT_STRIPE_CUSTOMER_ID = "AAAAAAAAAA";
    private static final String UPDATED_STRIPE_CUSTOMER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_INVOICE_ID = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PLAN_ID = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PLAN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CHARGE = "AAAAAAAAAA";
    private static final String UPDATED_CHARGE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final Double DEFAULT_PLAN_AMOUNT = 1D;
    private static final Double UPDATED_PLAN_AMOUNT = 2D;

    private static final ZonedDateTime DEFAULT_PLAN_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PLAN_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_PLAN_CURRENCY = "AAA";
    private static final String UPDATED_PLAN_CURRENCY = "BBB";

    private static final String DEFAULT_PLAN_INTERVAL = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_INTERVAL = "BBBBBBBBBB";

    private static final Integer DEFAULT_PLAN_INTERVAL_COUNT = 6;
    private static final Integer UPDATED_PLAN_INTERVAL_COUNT = 5;

    private static final Boolean DEFAULT_LIVE_MODE = false;
    private static final Boolean UPDATED_LIVE_MODE = true;

    private static final Boolean DEFAULT_PAID = false;
    private static final Boolean UPDATED_PAID = true;

    private static final ZonedDateTime DEFAULT_PERIOD_END = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PERIOD_END = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PERIOD_START = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PERIOD_START = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_SUBSCRIPTION_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_SUBSCRIPTION_VALUE = "BBBBBBBBBB";

    private static final Double DEFAULT_SUBTOTAL = 1D;
    private static final Double UPDATED_SUBTOTAL = 2D;

    private static final String DEFAULT_TAX = "AAAAAAAAAA";
    private static final String UPDATED_TAX = "BBBBBBBBBB";

    private static final String DEFAULT_TAX_PERCENT = "AAAAAAAAAA";
    private static final String UPDATED_TAX_PERCENT = "BBBBBBBBBB";

    private static final String DEFAULT_TAX_DISPLAY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TAX_DISPLAY_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_TOTAL = 1D;
    private static final Double UPDATED_TOTAL = 2D;

    private static final String DEFAULT_CURRENCY = "AAA";
    private static final String UPDATED_CURRENCY = "BBB";

    private static final String DEFAULT_STRIPE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_STRIPE_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_SUCCESS = false;
    private static final Boolean UPDATED_IS_SUCCESS = true;

    private static final String DEFAULT_INVOICE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private StripePaymentRepository stripePaymentRepository;

    @Autowired
    private StripePaymentMapper stripePaymentMapper;

    @Autowired
    private StripePaymentSearchRepository stripePaymentSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStripePaymentMockMvc;

    private StripePayment stripePayment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StripePaymentResource stripePaymentResource = new StripePaymentResource(stripePaymentRepository, stripePaymentMapper, stripePaymentSearchRepository);
        this.restStripePaymentMockMvc = MockMvcBuilders.standaloneSetup(stripePaymentResource)
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
    public static StripePayment createEntity(EntityManager em) {
        StripePayment stripePayment = new StripePayment()
            .stripeCustomerId(DEFAULT_STRIPE_CUSTOMER_ID)
            .invoiceId(DEFAULT_INVOICE_ID)
            .planId(DEFAULT_PLAN_ID)
            .planName(DEFAULT_PLAN_NAME)
            .charge(DEFAULT_CHARGE)
            .created(DEFAULT_CREATED)
            .amount(DEFAULT_AMOUNT)
            .planAmount(DEFAULT_PLAN_AMOUNT)
            .planCreated(DEFAULT_PLAN_CREATED)
            .planCurrency(DEFAULT_PLAN_CURRENCY)
            .planInterval(DEFAULT_PLAN_INTERVAL)
            .planIntervalCount(DEFAULT_PLAN_INTERVAL_COUNT)
            .liveMode(DEFAULT_LIVE_MODE)
            .paid(DEFAULT_PAID)
            .periodEnd(DEFAULT_PERIOD_END)
            .periodStart(DEFAULT_PERIOD_START)
            .subscriptionValue(DEFAULT_SUBSCRIPTION_VALUE)
            .subtotal(DEFAULT_SUBTOTAL)
            .tax(DEFAULT_TAX)
            .taxPercent(DEFAULT_TAX_PERCENT)
            .taxDisplayName(DEFAULT_TAX_DISPLAY_NAME)
            .total(DEFAULT_TOTAL)
            .currency(DEFAULT_CURRENCY)
            .stripeCode(DEFAULT_STRIPE_CODE)
            .isSuccess(DEFAULT_IS_SUCCESS)
            .invoiceNumber(DEFAULT_INVOICE_NUMBER);
        return stripePayment;
    }

    @Before
    public void initTest() {
        stripePaymentSearchRepository.deleteAll();
        stripePayment = createEntity(em);
    }

    @Test
    @Transactional
    public void createStripePayment() throws Exception {
        int databaseSizeBeforeCreate = stripePaymentRepository.findAll().size();

        // Create the StripePayment
        StripePaymentDTO stripePaymentDTO = stripePaymentMapper.toDto(stripePayment);
        restStripePaymentMockMvc.perform(post("/api/stripe-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripePaymentDTO)))
            .andExpect(status().isCreated());

        // Validate the StripePayment in the database
        List<StripePayment> stripePaymentList = stripePaymentRepository.findAll();
        assertThat(stripePaymentList).hasSize(databaseSizeBeforeCreate + 1);
        StripePayment testStripePayment = stripePaymentList.get(stripePaymentList.size() - 1);
        assertThat(testStripePayment.getStripeCustomerId()).isEqualTo(DEFAULT_STRIPE_CUSTOMER_ID);
        assertThat(testStripePayment.getInvoiceId()).isEqualTo(DEFAULT_INVOICE_ID);
        assertThat(testStripePayment.getPlanId()).isEqualTo(DEFAULT_PLAN_ID);
        assertThat(testStripePayment.getPlanName()).isEqualTo(DEFAULT_PLAN_NAME);
        assertThat(testStripePayment.getCharge()).isEqualTo(DEFAULT_CHARGE);
        assertThat(testStripePayment.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testStripePayment.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testStripePayment.getPlanAmount()).isEqualTo(DEFAULT_PLAN_AMOUNT);
        assertThat(testStripePayment.getPlanCreated()).isEqualTo(DEFAULT_PLAN_CREATED);
        assertThat(testStripePayment.getPlanCurrency()).isEqualTo(DEFAULT_PLAN_CURRENCY);
        assertThat(testStripePayment.getPlanInterval()).isEqualTo(DEFAULT_PLAN_INTERVAL);
        assertThat(testStripePayment.getPlanIntervalCount()).isEqualTo(DEFAULT_PLAN_INTERVAL_COUNT);
        assertThat(testStripePayment.isLiveMode()).isEqualTo(DEFAULT_LIVE_MODE);
        assertThat(testStripePayment.isPaid()).isEqualTo(DEFAULT_PAID);
        assertThat(testStripePayment.getPeriodEnd()).isEqualTo(DEFAULT_PERIOD_END);
        assertThat(testStripePayment.getPeriodStart()).isEqualTo(DEFAULT_PERIOD_START);
        assertThat(testStripePayment.getSubscriptionValue()).isEqualTo(DEFAULT_SUBSCRIPTION_VALUE);
        assertThat(testStripePayment.getSubtotal()).isEqualTo(DEFAULT_SUBTOTAL);
        assertThat(testStripePayment.getTax()).isEqualTo(DEFAULT_TAX);
        assertThat(testStripePayment.getTaxPercent()).isEqualTo(DEFAULT_TAX_PERCENT);
        assertThat(testStripePayment.getTaxDisplayName()).isEqualTo(DEFAULT_TAX_DISPLAY_NAME);
        assertThat(testStripePayment.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testStripePayment.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testStripePayment.getStripeCode()).isEqualTo(DEFAULT_STRIPE_CODE);
        assertThat(testStripePayment.isIsSuccess()).isEqualTo(DEFAULT_IS_SUCCESS);
        assertThat(testStripePayment.getInvoiceNumber()).isEqualTo(DEFAULT_INVOICE_NUMBER);

        // Validate the StripePayment in Elasticsearch
        StripePayment stripePaymentEs = stripePaymentSearchRepository.findOne(testStripePayment.getId());
        assertThat(testStripePayment.getCreated()).isEqualTo(testStripePayment.getCreated());
        assertThat(testStripePayment.getPlanCreated()).isEqualTo(testStripePayment.getPlanCreated());
        assertThat(testStripePayment.getPeriodEnd()).isEqualTo(testStripePayment.getPeriodEnd());
        assertThat(testStripePayment.getPeriodStart()).isEqualTo(testStripePayment.getPeriodStart());
        assertThat(stripePaymentEs).isEqualToIgnoringGivenFields(testStripePayment, "created", "planCreated", "periodEnd", "periodStart");
    }

    @Test
    @Transactional
    public void createStripePaymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stripePaymentRepository.findAll().size();

        // Create the StripePayment with an existing ID
        stripePayment.setId(1L);
        StripePaymentDTO stripePaymentDTO = stripePaymentMapper.toDto(stripePayment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStripePaymentMockMvc.perform(post("/api/stripe-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripePaymentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StripePayment in the database
        List<StripePayment> stripePaymentList = stripePaymentRepository.findAll();
        assertThat(stripePaymentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStripePayments() throws Exception {
        // Initialize the database
        stripePaymentRepository.saveAndFlush(stripePayment);

        // Get all the stripePaymentList
        restStripePaymentMockMvc.perform(get("/api/stripe-payments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stripePayment.getId().intValue())))
            .andExpect(jsonPath("$.[*].stripeCustomerId").value(hasItem(DEFAULT_STRIPE_CUSTOMER_ID.toString())))
            .andExpect(jsonPath("$.[*].invoiceId").value(hasItem(DEFAULT_INVOICE_ID.toString())))
            .andExpect(jsonPath("$.[*].planId").value(hasItem(DEFAULT_PLAN_ID.toString())))
            .andExpect(jsonPath("$.[*].planName").value(hasItem(DEFAULT_PLAN_NAME.toString())))
            .andExpect(jsonPath("$.[*].charge").value(hasItem(DEFAULT_CHARGE.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].planAmount").value(hasItem(DEFAULT_PLAN_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].planCreated").value(hasItem(sameInstant(DEFAULT_PLAN_CREATED))))
            .andExpect(jsonPath("$.[*].planCurrency").value(hasItem(DEFAULT_PLAN_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].planInterval").value(hasItem(DEFAULT_PLAN_INTERVAL.toString())))
            .andExpect(jsonPath("$.[*].planIntervalCount").value(hasItem(DEFAULT_PLAN_INTERVAL_COUNT)))
            .andExpect(jsonPath("$.[*].liveMode").value(hasItem(DEFAULT_LIVE_MODE.booleanValue())))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.booleanValue())))
            .andExpect(jsonPath("$.[*].periodEnd").value(hasItem(sameInstant(DEFAULT_PERIOD_END))))
            .andExpect(jsonPath("$.[*].periodStart").value(hasItem(sameInstant(DEFAULT_PERIOD_START))))
            .andExpect(jsonPath("$.[*].subscriptionValue").value(hasItem(DEFAULT_SUBSCRIPTION_VALUE.toString())))
            .andExpect(jsonPath("$.[*].subtotal").value(hasItem(DEFAULT_SUBTOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].tax").value(hasItem(DEFAULT_TAX.toString())))
            .andExpect(jsonPath("$.[*].taxPercent").value(hasItem(DEFAULT_TAX_PERCENT.toString())))
            .andExpect(jsonPath("$.[*].taxDisplayName").value(hasItem(DEFAULT_TAX_DISPLAY_NAME.toString())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].stripeCode").value(hasItem(DEFAULT_STRIPE_CODE.toString())))
            .andExpect(jsonPath("$.[*].isSuccess").value(hasItem(DEFAULT_IS_SUCCESS.booleanValue())))
            .andExpect(jsonPath("$.[*].invoiceNumber").value(hasItem(DEFAULT_INVOICE_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getStripePayment() throws Exception {
        // Initialize the database
        stripePaymentRepository.saveAndFlush(stripePayment);

        // Get the stripePayment
        restStripePaymentMockMvc.perform(get("/api/stripe-payments/{id}", stripePayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stripePayment.getId().intValue()))
            .andExpect(jsonPath("$.stripeCustomerId").value(DEFAULT_STRIPE_CUSTOMER_ID.toString()))
            .andExpect(jsonPath("$.invoiceId").value(DEFAULT_INVOICE_ID.toString()))
            .andExpect(jsonPath("$.planId").value(DEFAULT_PLAN_ID.toString()))
            .andExpect(jsonPath("$.planName").value(DEFAULT_PLAN_NAME.toString()))
            .andExpect(jsonPath("$.charge").value(DEFAULT_CHARGE.toString()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.planAmount").value(DEFAULT_PLAN_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.planCreated").value(sameInstant(DEFAULT_PLAN_CREATED)))
            .andExpect(jsonPath("$.planCurrency").value(DEFAULT_PLAN_CURRENCY.toString()))
            .andExpect(jsonPath("$.planInterval").value(DEFAULT_PLAN_INTERVAL.toString()))
            .andExpect(jsonPath("$.planIntervalCount").value(DEFAULT_PLAN_INTERVAL_COUNT))
            .andExpect(jsonPath("$.liveMode").value(DEFAULT_LIVE_MODE.booleanValue()))
            .andExpect(jsonPath("$.paid").value(DEFAULT_PAID.booleanValue()))
            .andExpect(jsonPath("$.periodEnd").value(sameInstant(DEFAULT_PERIOD_END)))
            .andExpect(jsonPath("$.periodStart").value(sameInstant(DEFAULT_PERIOD_START)))
            .andExpect(jsonPath("$.subscriptionValue").value(DEFAULT_SUBSCRIPTION_VALUE.toString()))
            .andExpect(jsonPath("$.subtotal").value(DEFAULT_SUBTOTAL.doubleValue()))
            .andExpect(jsonPath("$.tax").value(DEFAULT_TAX.toString()))
            .andExpect(jsonPath("$.taxPercent").value(DEFAULT_TAX_PERCENT.toString()))
            .andExpect(jsonPath("$.taxDisplayName").value(DEFAULT_TAX_DISPLAY_NAME.toString()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()))
            .andExpect(jsonPath("$.stripeCode").value(DEFAULT_STRIPE_CODE.toString()))
            .andExpect(jsonPath("$.isSuccess").value(DEFAULT_IS_SUCCESS.booleanValue()))
            .andExpect(jsonPath("$.invoiceNumber").value(DEFAULT_INVOICE_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStripePayment() throws Exception {
        // Get the stripePayment
        restStripePaymentMockMvc.perform(get("/api/stripe-payments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStripePayment() throws Exception {
        // Initialize the database
        stripePaymentRepository.saveAndFlush(stripePayment);
        stripePaymentSearchRepository.save(stripePayment);
        int databaseSizeBeforeUpdate = stripePaymentRepository.findAll().size();

        // Update the stripePayment
        StripePayment updatedStripePayment = stripePaymentRepository.findOne(stripePayment.getId());
        // Disconnect from session so that the updates on updatedStripePayment are not directly saved in db
        em.detach(updatedStripePayment);
        updatedStripePayment
            .stripeCustomerId(UPDATED_STRIPE_CUSTOMER_ID)
            .invoiceId(UPDATED_INVOICE_ID)
            .planId(UPDATED_PLAN_ID)
            .planName(UPDATED_PLAN_NAME)
            .charge(UPDATED_CHARGE)
            .created(UPDATED_CREATED)
            .amount(UPDATED_AMOUNT)
            .planAmount(UPDATED_PLAN_AMOUNT)
            .planCreated(UPDATED_PLAN_CREATED)
            .planCurrency(UPDATED_PLAN_CURRENCY)
            .planInterval(UPDATED_PLAN_INTERVAL)
            .planIntervalCount(UPDATED_PLAN_INTERVAL_COUNT)
            .liveMode(UPDATED_LIVE_MODE)
            .paid(UPDATED_PAID)
            .periodEnd(UPDATED_PERIOD_END)
            .periodStart(UPDATED_PERIOD_START)
            .subscriptionValue(UPDATED_SUBSCRIPTION_VALUE)
            .subtotal(UPDATED_SUBTOTAL)
            .tax(UPDATED_TAX)
            .taxPercent(UPDATED_TAX_PERCENT)
            .taxDisplayName(UPDATED_TAX_DISPLAY_NAME)
            .total(UPDATED_TOTAL)
            .currency(UPDATED_CURRENCY)
            .stripeCode(UPDATED_STRIPE_CODE)
            .isSuccess(UPDATED_IS_SUCCESS)
            .invoiceNumber(UPDATED_INVOICE_NUMBER);
        StripePaymentDTO stripePaymentDTO = stripePaymentMapper.toDto(updatedStripePayment);

        restStripePaymentMockMvc.perform(put("/api/stripe-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripePaymentDTO)))
            .andExpect(status().isOk());

        // Validate the StripePayment in the database
        List<StripePayment> stripePaymentList = stripePaymentRepository.findAll();
        assertThat(stripePaymentList).hasSize(databaseSizeBeforeUpdate);
        StripePayment testStripePayment = stripePaymentList.get(stripePaymentList.size() - 1);
        assertThat(testStripePayment.getStripeCustomerId()).isEqualTo(UPDATED_STRIPE_CUSTOMER_ID);
        assertThat(testStripePayment.getInvoiceId()).isEqualTo(UPDATED_INVOICE_ID);
        assertThat(testStripePayment.getPlanId()).isEqualTo(UPDATED_PLAN_ID);
        assertThat(testStripePayment.getPlanName()).isEqualTo(UPDATED_PLAN_NAME);
        assertThat(testStripePayment.getCharge()).isEqualTo(UPDATED_CHARGE);
        assertThat(testStripePayment.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testStripePayment.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testStripePayment.getPlanAmount()).isEqualTo(UPDATED_PLAN_AMOUNT);
        assertThat(testStripePayment.getPlanCreated()).isEqualTo(UPDATED_PLAN_CREATED);
        assertThat(testStripePayment.getPlanCurrency()).isEqualTo(UPDATED_PLAN_CURRENCY);
        assertThat(testStripePayment.getPlanInterval()).isEqualTo(UPDATED_PLAN_INTERVAL);
        assertThat(testStripePayment.getPlanIntervalCount()).isEqualTo(UPDATED_PLAN_INTERVAL_COUNT);
        assertThat(testStripePayment.isLiveMode()).isEqualTo(UPDATED_LIVE_MODE);
        assertThat(testStripePayment.isPaid()).isEqualTo(UPDATED_PAID);
        assertThat(testStripePayment.getPeriodEnd()).isEqualTo(UPDATED_PERIOD_END);
        assertThat(testStripePayment.getPeriodStart()).isEqualTo(UPDATED_PERIOD_START);
        assertThat(testStripePayment.getSubscriptionValue()).isEqualTo(UPDATED_SUBSCRIPTION_VALUE);
        assertThat(testStripePayment.getSubtotal()).isEqualTo(UPDATED_SUBTOTAL);
        assertThat(testStripePayment.getTax()).isEqualTo(UPDATED_TAX);
        assertThat(testStripePayment.getTaxPercent()).isEqualTo(UPDATED_TAX_PERCENT);
        assertThat(testStripePayment.getTaxDisplayName()).isEqualTo(UPDATED_TAX_DISPLAY_NAME);
        assertThat(testStripePayment.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testStripePayment.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testStripePayment.getStripeCode()).isEqualTo(UPDATED_STRIPE_CODE);
        assertThat(testStripePayment.isIsSuccess()).isEqualTo(UPDATED_IS_SUCCESS);
        assertThat(testStripePayment.getInvoiceNumber()).isEqualTo(UPDATED_INVOICE_NUMBER);

        // Validate the StripePayment in Elasticsearch
        StripePayment stripePaymentEs = stripePaymentSearchRepository.findOne(testStripePayment.getId());
        assertThat(testStripePayment.getCreated()).isEqualTo(testStripePayment.getCreated());
        assertThat(testStripePayment.getPlanCreated()).isEqualTo(testStripePayment.getPlanCreated());
        assertThat(testStripePayment.getPeriodEnd()).isEqualTo(testStripePayment.getPeriodEnd());
        assertThat(testStripePayment.getPeriodStart()).isEqualTo(testStripePayment.getPeriodStart());
        assertThat(stripePaymentEs).isEqualToIgnoringGivenFields(testStripePayment, "created", "planCreated", "periodEnd", "periodStart");
    }

    @Test
    @Transactional
    public void updateNonExistingStripePayment() throws Exception {
        int databaseSizeBeforeUpdate = stripePaymentRepository.findAll().size();

        // Create the StripePayment
        StripePaymentDTO stripePaymentDTO = stripePaymentMapper.toDto(stripePayment);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStripePaymentMockMvc.perform(put("/api/stripe-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripePaymentDTO)))
            .andExpect(status().isCreated());

        // Validate the StripePayment in the database
        List<StripePayment> stripePaymentList = stripePaymentRepository.findAll();
        assertThat(stripePaymentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStripePayment() throws Exception {
        // Initialize the database
        stripePaymentRepository.saveAndFlush(stripePayment);
        stripePaymentSearchRepository.save(stripePayment);
        int databaseSizeBeforeDelete = stripePaymentRepository.findAll().size();

        // Get the stripePayment
        restStripePaymentMockMvc.perform(delete("/api/stripe-payments/{id}", stripePayment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean stripePaymentExistsInEs = stripePaymentSearchRepository.exists(stripePayment.getId());
        assertThat(stripePaymentExistsInEs).isFalse();

        // Validate the database is empty
        List<StripePayment> stripePaymentList = stripePaymentRepository.findAll();
        assertThat(stripePaymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStripePayment() throws Exception {
        // Initialize the database
        stripePaymentRepository.saveAndFlush(stripePayment);
        stripePaymentSearchRepository.save(stripePayment);

        // Search the stripePayment
        restStripePaymentMockMvc.perform(get("/api/_search/stripe-payments?query=id:" + stripePayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stripePayment.getId().intValue())))
            .andExpect(jsonPath("$.[*].stripeCustomerId").value(hasItem(DEFAULT_STRIPE_CUSTOMER_ID.toString())))
            .andExpect(jsonPath("$.[*].invoiceId").value(hasItem(DEFAULT_INVOICE_ID.toString())))
            .andExpect(jsonPath("$.[*].planId").value(hasItem(DEFAULT_PLAN_ID.toString())))
            .andExpect(jsonPath("$.[*].planName").value(hasItem(DEFAULT_PLAN_NAME.toString())))
            .andExpect(jsonPath("$.[*].charge").value(hasItem(DEFAULT_CHARGE.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].planAmount").value(hasItem(DEFAULT_PLAN_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].planCreated").value(hasItem(sameInstant(DEFAULT_PLAN_CREATED))))
            .andExpect(jsonPath("$.[*].planCurrency").value(hasItem(DEFAULT_PLAN_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].planInterval").value(hasItem(DEFAULT_PLAN_INTERVAL.toString())))
            .andExpect(jsonPath("$.[*].planIntervalCount").value(hasItem(DEFAULT_PLAN_INTERVAL_COUNT)))
            .andExpect(jsonPath("$.[*].liveMode").value(hasItem(DEFAULT_LIVE_MODE.booleanValue())))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.booleanValue())))
            .andExpect(jsonPath("$.[*].periodEnd").value(hasItem(sameInstant(DEFAULT_PERIOD_END))))
            .andExpect(jsonPath("$.[*].periodStart").value(hasItem(sameInstant(DEFAULT_PERIOD_START))))
            .andExpect(jsonPath("$.[*].subscriptionValue").value(hasItem(DEFAULT_SUBSCRIPTION_VALUE.toString())))
            .andExpect(jsonPath("$.[*].subtotal").value(hasItem(DEFAULT_SUBTOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].tax").value(hasItem(DEFAULT_TAX.toString())))
            .andExpect(jsonPath("$.[*].taxPercent").value(hasItem(DEFAULT_TAX_PERCENT.toString())))
            .andExpect(jsonPath("$.[*].taxDisplayName").value(hasItem(DEFAULT_TAX_DISPLAY_NAME.toString())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].stripeCode").value(hasItem(DEFAULT_STRIPE_CODE.toString())))
            .andExpect(jsonPath("$.[*].isSuccess").value(hasItem(DEFAULT_IS_SUCCESS.booleanValue())))
            .andExpect(jsonPath("$.[*].invoiceNumber").value(hasItem(DEFAULT_INVOICE_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StripePayment.class);
        StripePayment stripePayment1 = new StripePayment();
        stripePayment1.setId(1L);
        StripePayment stripePayment2 = new StripePayment();
        stripePayment2.setId(stripePayment1.getId());
        assertThat(stripePayment1).isEqualTo(stripePayment2);
        stripePayment2.setId(2L);
        assertThat(stripePayment1).isNotEqualTo(stripePayment2);
        stripePayment1.setId(null);
        assertThat(stripePayment1).isNotEqualTo(stripePayment2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StripePaymentDTO.class);
        StripePaymentDTO stripePaymentDTO1 = new StripePaymentDTO();
        stripePaymentDTO1.setId(1L);
        StripePaymentDTO stripePaymentDTO2 = new StripePaymentDTO();
        assertThat(stripePaymentDTO1).isNotEqualTo(stripePaymentDTO2);
        stripePaymentDTO2.setId(stripePaymentDTO1.getId());
        assertThat(stripePaymentDTO1).isEqualTo(stripePaymentDTO2);
        stripePaymentDTO2.setId(2L);
        assertThat(stripePaymentDTO1).isNotEqualTo(stripePaymentDTO2);
        stripePaymentDTO1.setId(null);
        assertThat(stripePaymentDTO1).isNotEqualTo(stripePaymentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(stripePaymentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(stripePaymentMapper.fromId(null)).isNull();
    }
}

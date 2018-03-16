package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.CardExpiryReminder;
import com.elearningportal.apps.repository.CardExpiryReminderRepository;
import com.elearningportal.apps.repository.search.CardExpiryReminderSearchRepository;
import com.elearningportal.apps.service.dto.CardExpiryReminderDTO;
import com.elearningportal.apps.service.mapper.CardExpiryReminderMapper;
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
 * Test class for the CardExpiryReminderResource REST controller.
 *
 * @see CardExpiryReminderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class CardExpiryReminderResourceIntTest {

    private static final Integer DEFAULT_USER_ID = 1;
    private static final Integer UPDATED_USER_ID = 2;

    private static final String DEFAULT_MESSAGE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE_TYPE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_SEND_ON_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SEND_ON_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_IS_COMPLETE = false;
    private static final Boolean UPDATED_IS_COMPLETE = true;

    private static final String DEFAULT_REF_DATA = "AAAAAAAAAA";
    private static final String UPDATED_REF_DATA = "BBBBBBBBBB";

    @Autowired
    private CardExpiryReminderRepository cardExpiryReminderRepository;

    @Autowired
    private CardExpiryReminderMapper cardExpiryReminderMapper;

    @Autowired
    private CardExpiryReminderSearchRepository cardExpiryReminderSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCardExpiryReminderMockMvc;

    private CardExpiryReminder cardExpiryReminder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardExpiryReminderResource cardExpiryReminderResource = new CardExpiryReminderResource(cardExpiryReminderRepository, cardExpiryReminderMapper, cardExpiryReminderSearchRepository);
        this.restCardExpiryReminderMockMvc = MockMvcBuilders.standaloneSetup(cardExpiryReminderResource)
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
    public static CardExpiryReminder createEntity(EntityManager em) {
        CardExpiryReminder cardExpiryReminder = new CardExpiryReminder()
            .userId(DEFAULT_USER_ID)
            .messageType(DEFAULT_MESSAGE_TYPE)
            .sendOnDate(DEFAULT_SEND_ON_DATE)
            .isComplete(DEFAULT_IS_COMPLETE)
            .refData(DEFAULT_REF_DATA);
        return cardExpiryReminder;
    }

    @Before
    public void initTest() {
        cardExpiryReminderSearchRepository.deleteAll();
        cardExpiryReminder = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardExpiryReminder() throws Exception {
        int databaseSizeBeforeCreate = cardExpiryReminderRepository.findAll().size();

        // Create the CardExpiryReminder
        CardExpiryReminderDTO cardExpiryReminderDTO = cardExpiryReminderMapper.toDto(cardExpiryReminder);
        restCardExpiryReminderMockMvc.perform(post("/api/card-expiry-reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardExpiryReminderDTO)))
            .andExpect(status().isCreated());

        // Validate the CardExpiryReminder in the database
        List<CardExpiryReminder> cardExpiryReminderList = cardExpiryReminderRepository.findAll();
        assertThat(cardExpiryReminderList).hasSize(databaseSizeBeforeCreate + 1);
        CardExpiryReminder testCardExpiryReminder = cardExpiryReminderList.get(cardExpiryReminderList.size() - 1);
        assertThat(testCardExpiryReminder.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testCardExpiryReminder.getMessageType()).isEqualTo(DEFAULT_MESSAGE_TYPE);
        assertThat(testCardExpiryReminder.getSendOnDate()).isEqualTo(DEFAULT_SEND_ON_DATE);
        assertThat(testCardExpiryReminder.isIsComplete()).isEqualTo(DEFAULT_IS_COMPLETE);
        assertThat(testCardExpiryReminder.getRefData()).isEqualTo(DEFAULT_REF_DATA);

        // Validate the CardExpiryReminder in Elasticsearch
        CardExpiryReminder cardExpiryReminderEs = cardExpiryReminderSearchRepository.findOne(testCardExpiryReminder.getId());
        assertThat(cardExpiryReminderEs).isEqualToIgnoringGivenFields(testCardExpiryReminder);
    }

    @Test
    @Transactional
    public void createCardExpiryReminderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardExpiryReminderRepository.findAll().size();

        // Create the CardExpiryReminder with an existing ID
        cardExpiryReminder.setId(1L);
        CardExpiryReminderDTO cardExpiryReminderDTO = cardExpiryReminderMapper.toDto(cardExpiryReminder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardExpiryReminderMockMvc.perform(post("/api/card-expiry-reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardExpiryReminderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CardExpiryReminder in the database
        List<CardExpiryReminder> cardExpiryReminderList = cardExpiryReminderRepository.findAll();
        assertThat(cardExpiryReminderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCardExpiryReminders() throws Exception {
        // Initialize the database
        cardExpiryReminderRepository.saveAndFlush(cardExpiryReminder);

        // Get all the cardExpiryReminderList
        restCardExpiryReminderMockMvc.perform(get("/api/card-expiry-reminders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardExpiryReminder.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].messageType").value(hasItem(DEFAULT_MESSAGE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].sendOnDate").value(hasItem(DEFAULT_SEND_ON_DATE.toString())))
            .andExpect(jsonPath("$.[*].isComplete").value(hasItem(DEFAULT_IS_COMPLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].refData").value(hasItem(DEFAULT_REF_DATA.toString())));
    }

    @Test
    @Transactional
    public void getCardExpiryReminder() throws Exception {
        // Initialize the database
        cardExpiryReminderRepository.saveAndFlush(cardExpiryReminder);

        // Get the cardExpiryReminder
        restCardExpiryReminderMockMvc.perform(get("/api/card-expiry-reminders/{id}", cardExpiryReminder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cardExpiryReminder.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.messageType").value(DEFAULT_MESSAGE_TYPE.toString()))
            .andExpect(jsonPath("$.sendOnDate").value(DEFAULT_SEND_ON_DATE.toString()))
            .andExpect(jsonPath("$.isComplete").value(DEFAULT_IS_COMPLETE.booleanValue()))
            .andExpect(jsonPath("$.refData").value(DEFAULT_REF_DATA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCardExpiryReminder() throws Exception {
        // Get the cardExpiryReminder
        restCardExpiryReminderMockMvc.perform(get("/api/card-expiry-reminders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardExpiryReminder() throws Exception {
        // Initialize the database
        cardExpiryReminderRepository.saveAndFlush(cardExpiryReminder);
        cardExpiryReminderSearchRepository.save(cardExpiryReminder);
        int databaseSizeBeforeUpdate = cardExpiryReminderRepository.findAll().size();

        // Update the cardExpiryReminder
        CardExpiryReminder updatedCardExpiryReminder = cardExpiryReminderRepository.findOne(cardExpiryReminder.getId());
        // Disconnect from session so that the updates on updatedCardExpiryReminder are not directly saved in db
        em.detach(updatedCardExpiryReminder);
        updatedCardExpiryReminder
            .userId(UPDATED_USER_ID)
            .messageType(UPDATED_MESSAGE_TYPE)
            .sendOnDate(UPDATED_SEND_ON_DATE)
            .isComplete(UPDATED_IS_COMPLETE)
            .refData(UPDATED_REF_DATA);
        CardExpiryReminderDTO cardExpiryReminderDTO = cardExpiryReminderMapper.toDto(updatedCardExpiryReminder);

        restCardExpiryReminderMockMvc.perform(put("/api/card-expiry-reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardExpiryReminderDTO)))
            .andExpect(status().isOk());

        // Validate the CardExpiryReminder in the database
        List<CardExpiryReminder> cardExpiryReminderList = cardExpiryReminderRepository.findAll();
        assertThat(cardExpiryReminderList).hasSize(databaseSizeBeforeUpdate);
        CardExpiryReminder testCardExpiryReminder = cardExpiryReminderList.get(cardExpiryReminderList.size() - 1);
        assertThat(testCardExpiryReminder.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testCardExpiryReminder.getMessageType()).isEqualTo(UPDATED_MESSAGE_TYPE);
        assertThat(testCardExpiryReminder.getSendOnDate()).isEqualTo(UPDATED_SEND_ON_DATE);
        assertThat(testCardExpiryReminder.isIsComplete()).isEqualTo(UPDATED_IS_COMPLETE);
        assertThat(testCardExpiryReminder.getRefData()).isEqualTo(UPDATED_REF_DATA);

        // Validate the CardExpiryReminder in Elasticsearch
        CardExpiryReminder cardExpiryReminderEs = cardExpiryReminderSearchRepository.findOne(testCardExpiryReminder.getId());
        assertThat(cardExpiryReminderEs).isEqualToIgnoringGivenFields(testCardExpiryReminder);
    }

    @Test
    @Transactional
    public void updateNonExistingCardExpiryReminder() throws Exception {
        int databaseSizeBeforeUpdate = cardExpiryReminderRepository.findAll().size();

        // Create the CardExpiryReminder
        CardExpiryReminderDTO cardExpiryReminderDTO = cardExpiryReminderMapper.toDto(cardExpiryReminder);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCardExpiryReminderMockMvc.perform(put("/api/card-expiry-reminders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardExpiryReminderDTO)))
            .andExpect(status().isCreated());

        // Validate the CardExpiryReminder in the database
        List<CardExpiryReminder> cardExpiryReminderList = cardExpiryReminderRepository.findAll();
        assertThat(cardExpiryReminderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCardExpiryReminder() throws Exception {
        // Initialize the database
        cardExpiryReminderRepository.saveAndFlush(cardExpiryReminder);
        cardExpiryReminderSearchRepository.save(cardExpiryReminder);
        int databaseSizeBeforeDelete = cardExpiryReminderRepository.findAll().size();

        // Get the cardExpiryReminder
        restCardExpiryReminderMockMvc.perform(delete("/api/card-expiry-reminders/{id}", cardExpiryReminder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean cardExpiryReminderExistsInEs = cardExpiryReminderSearchRepository.exists(cardExpiryReminder.getId());
        assertThat(cardExpiryReminderExistsInEs).isFalse();

        // Validate the database is empty
        List<CardExpiryReminder> cardExpiryReminderList = cardExpiryReminderRepository.findAll();
        assertThat(cardExpiryReminderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCardExpiryReminder() throws Exception {
        // Initialize the database
        cardExpiryReminderRepository.saveAndFlush(cardExpiryReminder);
        cardExpiryReminderSearchRepository.save(cardExpiryReminder);

        // Search the cardExpiryReminder
        restCardExpiryReminderMockMvc.perform(get("/api/_search/card-expiry-reminders?query=id:" + cardExpiryReminder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardExpiryReminder.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].messageType").value(hasItem(DEFAULT_MESSAGE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].sendOnDate").value(hasItem(DEFAULT_SEND_ON_DATE.toString())))
            .andExpect(jsonPath("$.[*].isComplete").value(hasItem(DEFAULT_IS_COMPLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].refData").value(hasItem(DEFAULT_REF_DATA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardExpiryReminder.class);
        CardExpiryReminder cardExpiryReminder1 = new CardExpiryReminder();
        cardExpiryReminder1.setId(1L);
        CardExpiryReminder cardExpiryReminder2 = new CardExpiryReminder();
        cardExpiryReminder2.setId(cardExpiryReminder1.getId());
        assertThat(cardExpiryReminder1).isEqualTo(cardExpiryReminder2);
        cardExpiryReminder2.setId(2L);
        assertThat(cardExpiryReminder1).isNotEqualTo(cardExpiryReminder2);
        cardExpiryReminder1.setId(null);
        assertThat(cardExpiryReminder1).isNotEqualTo(cardExpiryReminder2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardExpiryReminderDTO.class);
        CardExpiryReminderDTO cardExpiryReminderDTO1 = new CardExpiryReminderDTO();
        cardExpiryReminderDTO1.setId(1L);
        CardExpiryReminderDTO cardExpiryReminderDTO2 = new CardExpiryReminderDTO();
        assertThat(cardExpiryReminderDTO1).isNotEqualTo(cardExpiryReminderDTO2);
        cardExpiryReminderDTO2.setId(cardExpiryReminderDTO1.getId());
        assertThat(cardExpiryReminderDTO1).isEqualTo(cardExpiryReminderDTO2);
        cardExpiryReminderDTO2.setId(2L);
        assertThat(cardExpiryReminderDTO1).isNotEqualTo(cardExpiryReminderDTO2);
        cardExpiryReminderDTO1.setId(null);
        assertThat(cardExpiryReminderDTO1).isNotEqualTo(cardExpiryReminderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cardExpiryReminderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cardExpiryReminderMapper.fromId(null)).isNull();
    }
}

package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Offer;
import com.elearningportal.apps.repository.OfferRepository;
import com.elearningportal.apps.repository.search.OfferSearchRepository;
import com.elearningportal.apps.service.dto.OfferDTO;
import com.elearningportal.apps.service.mapper.OfferMapper;
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
 * Test class for the OfferResource REST controller.
 *
 * @see OfferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class OfferResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private OfferMapper offerMapper;

    @Autowired
    private OfferSearchRepository offerSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOfferMockMvc;

    private Offer offer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OfferResource offerResource = new OfferResource(offerRepository, offerMapper, offerSearchRepository);
        this.restOfferMockMvc = MockMvcBuilders.standaloneSetup(offerResource)
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
    public static Offer createEntity(EntityManager em) {
        Offer offer = new Offer()
            .name(DEFAULT_NAME);
        return offer;
    }

    @Before
    public void initTest() {
        offerSearchRepository.deleteAll();
        offer = createEntity(em);
    }

    @Test
    @Transactional
    public void createOffer() throws Exception {
        int databaseSizeBeforeCreate = offerRepository.findAll().size();

        // Create the Offer
        OfferDTO offerDTO = offerMapper.toDto(offer);
        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerDTO)))
            .andExpect(status().isCreated());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeCreate + 1);
        Offer testOffer = offerList.get(offerList.size() - 1);
        assertThat(testOffer.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Offer in Elasticsearch
        Offer offerEs = offerSearchRepository.findOne(testOffer.getId());
        assertThat(offerEs).isEqualToIgnoringGivenFields(testOffer);
    }

    @Test
    @Transactional
    public void createOfferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offerRepository.findAll().size();

        // Create the Offer with an existing ID
        offer.setId(1L);
        OfferDTO offerDTO = offerMapper.toDto(offer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setName(null);

        // Create the Offer, which fails.
        OfferDTO offerDTO = offerMapper.toDto(offer);

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerDTO)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOffers() throws Exception {
        // Initialize the database
        offerRepository.saveAndFlush(offer);

        // Get all the offerList
        restOfferMockMvc.perform(get("/api/offers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getOffer() throws Exception {
        // Initialize the database
        offerRepository.saveAndFlush(offer);

        // Get the offer
        restOfferMockMvc.perform(get("/api/offers/{id}", offer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOffer() throws Exception {
        // Get the offer
        restOfferMockMvc.perform(get("/api/offers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOffer() throws Exception {
        // Initialize the database
        offerRepository.saveAndFlush(offer);
        offerSearchRepository.save(offer);
        int databaseSizeBeforeUpdate = offerRepository.findAll().size();

        // Update the offer
        Offer updatedOffer = offerRepository.findOne(offer.getId());
        // Disconnect from session so that the updates on updatedOffer are not directly saved in db
        em.detach(updatedOffer);
        updatedOffer
            .name(UPDATED_NAME);
        OfferDTO offerDTO = offerMapper.toDto(updatedOffer);

        restOfferMockMvc.perform(put("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerDTO)))
            .andExpect(status().isOk());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeUpdate);
        Offer testOffer = offerList.get(offerList.size() - 1);
        assertThat(testOffer.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Offer in Elasticsearch
        Offer offerEs = offerSearchRepository.findOne(testOffer.getId());
        assertThat(offerEs).isEqualToIgnoringGivenFields(testOffer);
    }

    @Test
    @Transactional
    public void updateNonExistingOffer() throws Exception {
        int databaseSizeBeforeUpdate = offerRepository.findAll().size();

        // Create the Offer
        OfferDTO offerDTO = offerMapper.toDto(offer);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOfferMockMvc.perform(put("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerDTO)))
            .andExpect(status().isCreated());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOffer() throws Exception {
        // Initialize the database
        offerRepository.saveAndFlush(offer);
        offerSearchRepository.save(offer);
        int databaseSizeBeforeDelete = offerRepository.findAll().size();

        // Get the offer
        restOfferMockMvc.perform(delete("/api/offers/{id}", offer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean offerExistsInEs = offerSearchRepository.exists(offer.getId());
        assertThat(offerExistsInEs).isFalse();

        // Validate the database is empty
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchOffer() throws Exception {
        // Initialize the database
        offerRepository.saveAndFlush(offer);
        offerSearchRepository.save(offer);

        // Search the offer
        restOfferMockMvc.perform(get("/api/_search/offers?query=id:" + offer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Offer.class);
        Offer offer1 = new Offer();
        offer1.setId(1L);
        Offer offer2 = new Offer();
        offer2.setId(offer1.getId());
        assertThat(offer1).isEqualTo(offer2);
        offer2.setId(2L);
        assertThat(offer1).isNotEqualTo(offer2);
        offer1.setId(null);
        assertThat(offer1).isNotEqualTo(offer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfferDTO.class);
        OfferDTO offerDTO1 = new OfferDTO();
        offerDTO1.setId(1L);
        OfferDTO offerDTO2 = new OfferDTO();
        assertThat(offerDTO1).isNotEqualTo(offerDTO2);
        offerDTO2.setId(offerDTO1.getId());
        assertThat(offerDTO1).isEqualTo(offerDTO2);
        offerDTO2.setId(2L);
        assertThat(offerDTO1).isNotEqualTo(offerDTO2);
        offerDTO1.setId(null);
        assertThat(offerDTO1).isNotEqualTo(offerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(offerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(offerMapper.fromId(null)).isNull();
    }
}

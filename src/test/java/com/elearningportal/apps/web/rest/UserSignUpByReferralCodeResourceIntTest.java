package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.UserSignUpByReferralCode;
import com.elearningportal.apps.repository.UserSignUpByReferralCodeRepository;
import com.elearningportal.apps.repository.search.UserSignUpByReferralCodeSearchRepository;
import com.elearningportal.apps.service.dto.UserSignUpByReferralCodeDTO;
import com.elearningportal.apps.service.mapper.UserSignUpByReferralCodeMapper;
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
 * Test class for the UserSignUpByReferralCodeResource REST controller.
 *
 * @see UserSignUpByReferralCodeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class UserSignUpByReferralCodeResourceIntTest {

    private static final String DEFAULT_REFERRAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_REFERRAL_CODE = "BBBBBBBBBB";

    @Autowired
    private UserSignUpByReferralCodeRepository userSignUpByReferralCodeRepository;

    @Autowired
    private UserSignUpByReferralCodeMapper userSignUpByReferralCodeMapper;

    @Autowired
    private UserSignUpByReferralCodeSearchRepository userSignUpByReferralCodeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserSignUpByReferralCodeMockMvc;

    private UserSignUpByReferralCode userSignUpByReferralCode;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserSignUpByReferralCodeResource userSignUpByReferralCodeResource = new UserSignUpByReferralCodeResource(userSignUpByReferralCodeRepository, userSignUpByReferralCodeMapper, userSignUpByReferralCodeSearchRepository);
        this.restUserSignUpByReferralCodeMockMvc = MockMvcBuilders.standaloneSetup(userSignUpByReferralCodeResource)
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
    public static UserSignUpByReferralCode createEntity(EntityManager em) {
        UserSignUpByReferralCode userSignUpByReferralCode = new UserSignUpByReferralCode()
            .referralCode(DEFAULT_REFERRAL_CODE);
        return userSignUpByReferralCode;
    }

    @Before
    public void initTest() {
        userSignUpByReferralCodeSearchRepository.deleteAll();
        userSignUpByReferralCode = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSignUpByReferralCode() throws Exception {
        int databaseSizeBeforeCreate = userSignUpByReferralCodeRepository.findAll().size();

        // Create the UserSignUpByReferralCode
        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO = userSignUpByReferralCodeMapper.toDto(userSignUpByReferralCode);
        restUserSignUpByReferralCodeMockMvc.perform(post("/api/user-sign-up-by-referral-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSignUpByReferralCodeDTO)))
            .andExpect(status().isCreated());

        // Validate the UserSignUpByReferralCode in the database
        List<UserSignUpByReferralCode> userSignUpByReferralCodeList = userSignUpByReferralCodeRepository.findAll();
        assertThat(userSignUpByReferralCodeList).hasSize(databaseSizeBeforeCreate + 1);
        UserSignUpByReferralCode testUserSignUpByReferralCode = userSignUpByReferralCodeList.get(userSignUpByReferralCodeList.size() - 1);
        assertThat(testUserSignUpByReferralCode.getReferralCode()).isEqualTo(DEFAULT_REFERRAL_CODE);

        // Validate the UserSignUpByReferralCode in Elasticsearch
        UserSignUpByReferralCode userSignUpByReferralCodeEs = userSignUpByReferralCodeSearchRepository.findOne(testUserSignUpByReferralCode.getId());
        assertThat(userSignUpByReferralCodeEs).isEqualToIgnoringGivenFields(testUserSignUpByReferralCode);
    }

    @Test
    @Transactional
    public void createUserSignUpByReferralCodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSignUpByReferralCodeRepository.findAll().size();

        // Create the UserSignUpByReferralCode with an existing ID
        userSignUpByReferralCode.setId(1L);
        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO = userSignUpByReferralCodeMapper.toDto(userSignUpByReferralCode);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSignUpByReferralCodeMockMvc.perform(post("/api/user-sign-up-by-referral-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSignUpByReferralCodeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserSignUpByReferralCode in the database
        List<UserSignUpByReferralCode> userSignUpByReferralCodeList = userSignUpByReferralCodeRepository.findAll();
        assertThat(userSignUpByReferralCodeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserSignUpByReferralCodes() throws Exception {
        // Initialize the database
        userSignUpByReferralCodeRepository.saveAndFlush(userSignUpByReferralCode);

        // Get all the userSignUpByReferralCodeList
        restUserSignUpByReferralCodeMockMvc.perform(get("/api/user-sign-up-by-referral-codes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSignUpByReferralCode.getId().intValue())))
            .andExpect(jsonPath("$.[*].referralCode").value(hasItem(DEFAULT_REFERRAL_CODE.toString())));
    }

    @Test
    @Transactional
    public void getUserSignUpByReferralCode() throws Exception {
        // Initialize the database
        userSignUpByReferralCodeRepository.saveAndFlush(userSignUpByReferralCode);

        // Get the userSignUpByReferralCode
        restUserSignUpByReferralCodeMockMvc.perform(get("/api/user-sign-up-by-referral-codes/{id}", userSignUpByReferralCode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userSignUpByReferralCode.getId().intValue()))
            .andExpect(jsonPath("$.referralCode").value(DEFAULT_REFERRAL_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserSignUpByReferralCode() throws Exception {
        // Get the userSignUpByReferralCode
        restUserSignUpByReferralCodeMockMvc.perform(get("/api/user-sign-up-by-referral-codes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSignUpByReferralCode() throws Exception {
        // Initialize the database
        userSignUpByReferralCodeRepository.saveAndFlush(userSignUpByReferralCode);
        userSignUpByReferralCodeSearchRepository.save(userSignUpByReferralCode);
        int databaseSizeBeforeUpdate = userSignUpByReferralCodeRepository.findAll().size();

        // Update the userSignUpByReferralCode
        UserSignUpByReferralCode updatedUserSignUpByReferralCode = userSignUpByReferralCodeRepository.findOne(userSignUpByReferralCode.getId());
        // Disconnect from session so that the updates on updatedUserSignUpByReferralCode are not directly saved in db
        em.detach(updatedUserSignUpByReferralCode);
        updatedUserSignUpByReferralCode
            .referralCode(UPDATED_REFERRAL_CODE);
        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO = userSignUpByReferralCodeMapper.toDto(updatedUserSignUpByReferralCode);

        restUserSignUpByReferralCodeMockMvc.perform(put("/api/user-sign-up-by-referral-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSignUpByReferralCodeDTO)))
            .andExpect(status().isOk());

        // Validate the UserSignUpByReferralCode in the database
        List<UserSignUpByReferralCode> userSignUpByReferralCodeList = userSignUpByReferralCodeRepository.findAll();
        assertThat(userSignUpByReferralCodeList).hasSize(databaseSizeBeforeUpdate);
        UserSignUpByReferralCode testUserSignUpByReferralCode = userSignUpByReferralCodeList.get(userSignUpByReferralCodeList.size() - 1);
        assertThat(testUserSignUpByReferralCode.getReferralCode()).isEqualTo(UPDATED_REFERRAL_CODE);

        // Validate the UserSignUpByReferralCode in Elasticsearch
        UserSignUpByReferralCode userSignUpByReferralCodeEs = userSignUpByReferralCodeSearchRepository.findOne(testUserSignUpByReferralCode.getId());
        assertThat(userSignUpByReferralCodeEs).isEqualToIgnoringGivenFields(testUserSignUpByReferralCode);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSignUpByReferralCode() throws Exception {
        int databaseSizeBeforeUpdate = userSignUpByReferralCodeRepository.findAll().size();

        // Create the UserSignUpByReferralCode
        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO = userSignUpByReferralCodeMapper.toDto(userSignUpByReferralCode);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserSignUpByReferralCodeMockMvc.perform(put("/api/user-sign-up-by-referral-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSignUpByReferralCodeDTO)))
            .andExpect(status().isCreated());

        // Validate the UserSignUpByReferralCode in the database
        List<UserSignUpByReferralCode> userSignUpByReferralCodeList = userSignUpByReferralCodeRepository.findAll();
        assertThat(userSignUpByReferralCodeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserSignUpByReferralCode() throws Exception {
        // Initialize the database
        userSignUpByReferralCodeRepository.saveAndFlush(userSignUpByReferralCode);
        userSignUpByReferralCodeSearchRepository.save(userSignUpByReferralCode);
        int databaseSizeBeforeDelete = userSignUpByReferralCodeRepository.findAll().size();

        // Get the userSignUpByReferralCode
        restUserSignUpByReferralCodeMockMvc.perform(delete("/api/user-sign-up-by-referral-codes/{id}", userSignUpByReferralCode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean userSignUpByReferralCodeExistsInEs = userSignUpByReferralCodeSearchRepository.exists(userSignUpByReferralCode.getId());
        assertThat(userSignUpByReferralCodeExistsInEs).isFalse();

        // Validate the database is empty
        List<UserSignUpByReferralCode> userSignUpByReferralCodeList = userSignUpByReferralCodeRepository.findAll();
        assertThat(userSignUpByReferralCodeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchUserSignUpByReferralCode() throws Exception {
        // Initialize the database
        userSignUpByReferralCodeRepository.saveAndFlush(userSignUpByReferralCode);
        userSignUpByReferralCodeSearchRepository.save(userSignUpByReferralCode);

        // Search the userSignUpByReferralCode
        restUserSignUpByReferralCodeMockMvc.perform(get("/api/_search/user-sign-up-by-referral-codes?query=id:" + userSignUpByReferralCode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSignUpByReferralCode.getId().intValue())))
            .andExpect(jsonPath("$.[*].referralCode").value(hasItem(DEFAULT_REFERRAL_CODE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserSignUpByReferralCode.class);
        UserSignUpByReferralCode userSignUpByReferralCode1 = new UserSignUpByReferralCode();
        userSignUpByReferralCode1.setId(1L);
        UserSignUpByReferralCode userSignUpByReferralCode2 = new UserSignUpByReferralCode();
        userSignUpByReferralCode2.setId(userSignUpByReferralCode1.getId());
        assertThat(userSignUpByReferralCode1).isEqualTo(userSignUpByReferralCode2);
        userSignUpByReferralCode2.setId(2L);
        assertThat(userSignUpByReferralCode1).isNotEqualTo(userSignUpByReferralCode2);
        userSignUpByReferralCode1.setId(null);
        assertThat(userSignUpByReferralCode1).isNotEqualTo(userSignUpByReferralCode2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserSignUpByReferralCodeDTO.class);
        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO1 = new UserSignUpByReferralCodeDTO();
        userSignUpByReferralCodeDTO1.setId(1L);
        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO2 = new UserSignUpByReferralCodeDTO();
        assertThat(userSignUpByReferralCodeDTO1).isNotEqualTo(userSignUpByReferralCodeDTO2);
        userSignUpByReferralCodeDTO2.setId(userSignUpByReferralCodeDTO1.getId());
        assertThat(userSignUpByReferralCodeDTO1).isEqualTo(userSignUpByReferralCodeDTO2);
        userSignUpByReferralCodeDTO2.setId(2L);
        assertThat(userSignUpByReferralCodeDTO1).isNotEqualTo(userSignUpByReferralCodeDTO2);
        userSignUpByReferralCodeDTO1.setId(null);
        assertThat(userSignUpByReferralCodeDTO1).isNotEqualTo(userSignUpByReferralCodeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userSignUpByReferralCodeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userSignUpByReferralCodeMapper.fromId(null)).isNull();
    }
}

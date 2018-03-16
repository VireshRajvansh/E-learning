package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.Quiz;
import com.elearningportal.apps.repository.QuizRepository;
import com.elearningportal.apps.repository.search.QuizSearchRepository;
import com.elearningportal.apps.service.dto.QuizDTO;
import com.elearningportal.apps.service.mapper.QuizMapper;
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
 * Test class for the QuizResource REST controller.
 *
 * @see QuizResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class QuizResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SLUG = "AAAAAAAAAA";
    private static final String UPDATED_SLUG = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_DESC = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_COMPLETE = false;
    private static final Boolean UPDATED_IS_COMPLETE = true;

    private static final String DEFAULT_TAG_LINE = "AAAAAAAAAA";
    private static final String UPDATED_TAG_LINE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Boolean DEFAULT_SELECTED = false;
    private static final Boolean UPDATED_SELECTED = true;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizMapper quizMapper;

    @Autowired
    private QuizSearchRepository quizSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQuizMockMvc;

    private Quiz quiz;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuizResource quizResource = new QuizResource(quizRepository, quizMapper, quizSearchRepository);
        this.restQuizMockMvc = MockMvcBuilders.standaloneSetup(quizResource)
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
    public static Quiz createEntity(EntityManager em) {
        Quiz quiz = new Quiz()
            .name(DEFAULT_NAME)
            .slug(DEFAULT_SLUG)
            .text(DEFAULT_TEXT)
            .type(DEFAULT_TYPE)
            .shortDesc(DEFAULT_SHORT_DESC)
            .isComplete(DEFAULT_IS_COMPLETE)
            .tagLine(DEFAULT_TAG_LINE)
            .active(DEFAULT_ACTIVE)
            .selected(DEFAULT_SELECTED);
        return quiz;
    }

    @Before
    public void initTest() {
        quizSearchRepository.deleteAll();
        quiz = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuiz() throws Exception {
        int databaseSizeBeforeCreate = quizRepository.findAll().size();

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);
        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isCreated());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeCreate + 1);
        Quiz testQuiz = quizList.get(quizList.size() - 1);
        assertThat(testQuiz.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testQuiz.getSlug()).isEqualTo(DEFAULT_SLUG);
        assertThat(testQuiz.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testQuiz.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testQuiz.getShortDesc()).isEqualTo(DEFAULT_SHORT_DESC);
        assertThat(testQuiz.isIsComplete()).isEqualTo(DEFAULT_IS_COMPLETE);
        assertThat(testQuiz.getTagLine()).isEqualTo(DEFAULT_TAG_LINE);
        assertThat(testQuiz.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testQuiz.isSelected()).isEqualTo(DEFAULT_SELECTED);

        // Validate the Quiz in Elasticsearch
        Quiz quizEs = quizSearchRepository.findOne(testQuiz.getId());
        assertThat(quizEs).isEqualToIgnoringGivenFields(testQuiz);
    }

    @Test
    @Transactional
    public void createQuizWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quizRepository.findAll().size();

        // Create the Quiz with an existing ID
        quiz.setId(1L);
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllQuizzes() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        // Get all the quizList
        restQuizMockMvc.perform(get("/api/quizzes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].shortDesc").value(hasItem(DEFAULT_SHORT_DESC.toString())))
            .andExpect(jsonPath("$.[*].isComplete").value(hasItem(DEFAULT_IS_COMPLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].tagLine").value(hasItem(DEFAULT_TAG_LINE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].selected").value(hasItem(DEFAULT_SELECTED.booleanValue())));
    }

    @Test
    @Transactional
    public void getQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        // Get the quiz
        restQuizMockMvc.perform(get("/api/quizzes/{id}", quiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(quiz.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.slug").value(DEFAULT_SLUG.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.shortDesc").value(DEFAULT_SHORT_DESC.toString()))
            .andExpect(jsonPath("$.isComplete").value(DEFAULT_IS_COMPLETE.booleanValue()))
            .andExpect(jsonPath("$.tagLine").value(DEFAULT_TAG_LINE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.selected").value(DEFAULT_SELECTED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingQuiz() throws Exception {
        // Get the quiz
        restQuizMockMvc.perform(get("/api/quizzes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);
        quizSearchRepository.save(quiz);
        int databaseSizeBeforeUpdate = quizRepository.findAll().size();

        // Update the quiz
        Quiz updatedQuiz = quizRepository.findOne(quiz.getId());
        // Disconnect from session so that the updates on updatedQuiz are not directly saved in db
        em.detach(updatedQuiz);
        updatedQuiz
            .name(UPDATED_NAME)
            .slug(UPDATED_SLUG)
            .text(UPDATED_TEXT)
            .type(UPDATED_TYPE)
            .shortDesc(UPDATED_SHORT_DESC)
            .isComplete(UPDATED_IS_COMPLETE)
            .tagLine(UPDATED_TAG_LINE)
            .active(UPDATED_ACTIVE)
            .selected(UPDATED_SELECTED);
        QuizDTO quizDTO = quizMapper.toDto(updatedQuiz);

        restQuizMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isOk());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeUpdate);
        Quiz testQuiz = quizList.get(quizList.size() - 1);
        assertThat(testQuiz.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testQuiz.getSlug()).isEqualTo(UPDATED_SLUG);
        assertThat(testQuiz.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testQuiz.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testQuiz.getShortDesc()).isEqualTo(UPDATED_SHORT_DESC);
        assertThat(testQuiz.isIsComplete()).isEqualTo(UPDATED_IS_COMPLETE);
        assertThat(testQuiz.getTagLine()).isEqualTo(UPDATED_TAG_LINE);
        assertThat(testQuiz.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testQuiz.isSelected()).isEqualTo(UPDATED_SELECTED);

        // Validate the Quiz in Elasticsearch
        Quiz quizEs = quizSearchRepository.findOne(testQuiz.getId());
        assertThat(quizEs).isEqualToIgnoringGivenFields(testQuiz);
    }

    @Test
    @Transactional
    public void updateNonExistingQuiz() throws Exception {
        int databaseSizeBeforeUpdate = quizRepository.findAll().size();

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restQuizMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isCreated());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);
        quizSearchRepository.save(quiz);
        int databaseSizeBeforeDelete = quizRepository.findAll().size();

        // Get the quiz
        restQuizMockMvc.perform(delete("/api/quizzes/{id}", quiz.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean quizExistsInEs = quizSearchRepository.exists(quiz.getId());
        assertThat(quizExistsInEs).isFalse();

        // Validate the database is empty
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);
        quizSearchRepository.save(quiz);

        // Search the quiz
        restQuizMockMvc.perform(get("/api/_search/quizzes?query=id:" + quiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].shortDesc").value(hasItem(DEFAULT_SHORT_DESC.toString())))
            .andExpect(jsonPath("$.[*].isComplete").value(hasItem(DEFAULT_IS_COMPLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].tagLine").value(hasItem(DEFAULT_TAG_LINE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].selected").value(hasItem(DEFAULT_SELECTED.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Quiz.class);
        Quiz quiz1 = new Quiz();
        quiz1.setId(1L);
        Quiz quiz2 = new Quiz();
        quiz2.setId(quiz1.getId());
        assertThat(quiz1).isEqualTo(quiz2);
        quiz2.setId(2L);
        assertThat(quiz1).isNotEqualTo(quiz2);
        quiz1.setId(null);
        assertThat(quiz1).isNotEqualTo(quiz2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizDTO.class);
        QuizDTO quizDTO1 = new QuizDTO();
        quizDTO1.setId(1L);
        QuizDTO quizDTO2 = new QuizDTO();
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
        quizDTO2.setId(quizDTO1.getId());
        assertThat(quizDTO1).isEqualTo(quizDTO2);
        quizDTO2.setId(2L);
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
        quizDTO1.setId(null);
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(quizMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(quizMapper.fromId(null)).isNull();
    }
}

package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.PlayList;
import com.elearningportal.apps.repository.PlayListRepository;
import com.elearningportal.apps.repository.search.PlayListSearchRepository;
import com.elearningportal.apps.service.dto.PlayListDTO;
import com.elearningportal.apps.service.mapper.PlayListMapper;
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
 * Test class for the PlayListResource REST controller.
 *
 * @see PlayListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class PlayListResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SLUG = "AAAAAAAAAA";
    private static final String UPDATED_SLUG = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_LENGTH = 1;
    private static final Integer UPDATED_LENGTH = 2;

    private static final String DEFAULT_DURATION = "AAAAAAAAAA";
    private static final String UPDATED_DURATION = "BBBBBBBBBB";

    private static final String DEFAULT_TAG_LINE = "AAAAAAAAAA";
    private static final String UPDATED_TAG_LINE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private PlayListRepository playListRepository;

    @Autowired
    private PlayListMapper playListMapper;

    @Autowired
    private PlayListSearchRepository playListSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPlayListMockMvc;

    private PlayList playList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlayListResource playListResource = new PlayListResource(playListRepository, playListMapper, playListSearchRepository);
        this.restPlayListMockMvc = MockMvcBuilders.standaloneSetup(playListResource)
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
    public static PlayList createEntity(EntityManager em) {
        PlayList playList = new PlayList()
            .name(DEFAULT_NAME)
            .slug(DEFAULT_SLUG)
            .type(DEFAULT_TYPE)
            .length(DEFAULT_LENGTH)
            .duration(DEFAULT_DURATION)
            .tagLine(DEFAULT_TAG_LINE)
            .active(DEFAULT_ACTIVE);
        return playList;
    }

    @Before
    public void initTest() {
        playListSearchRepository.deleteAll();
        playList = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlayList() throws Exception {
        int databaseSizeBeforeCreate = playListRepository.findAll().size();

        // Create the PlayList
        PlayListDTO playListDTO = playListMapper.toDto(playList);
        restPlayListMockMvc.perform(post("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playListDTO)))
            .andExpect(status().isCreated());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeCreate + 1);
        PlayList testPlayList = playListList.get(playListList.size() - 1);
        assertThat(testPlayList.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlayList.getSlug()).isEqualTo(DEFAULT_SLUG);
        assertThat(testPlayList.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPlayList.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testPlayList.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testPlayList.getTagLine()).isEqualTo(DEFAULT_TAG_LINE);
        assertThat(testPlayList.isActive()).isEqualTo(DEFAULT_ACTIVE);

        // Validate the PlayList in Elasticsearch
        PlayList playListEs = playListSearchRepository.findOne(testPlayList.getId());
        assertThat(playListEs).isEqualToIgnoringGivenFields(testPlayList);
    }

    @Test
    @Transactional
    public void createPlayListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playListRepository.findAll().size();

        // Create the PlayList with an existing ID
        playList.setId(1L);
        PlayListDTO playListDTO = playListMapper.toDto(playList);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlayListMockMvc.perform(post("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlayLists() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);

        // Get all the playListList
        restPlayListMockMvc.perform(get("/api/play-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())))
            .andExpect(jsonPath("$.[*].tagLine").value(hasItem(DEFAULT_TAG_LINE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getPlayList() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);

        // Get the playList
        restPlayListMockMvc.perform(get("/api/play-lists/{id}", playList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(playList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.slug").value(DEFAULT_SLUG.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.toString()))
            .andExpect(jsonPath("$.tagLine").value(DEFAULT_TAG_LINE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlayList() throws Exception {
        // Get the playList
        restPlayListMockMvc.perform(get("/api/play-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlayList() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);
        playListSearchRepository.save(playList);
        int databaseSizeBeforeUpdate = playListRepository.findAll().size();

        // Update the playList
        PlayList updatedPlayList = playListRepository.findOne(playList.getId());
        // Disconnect from session so that the updates on updatedPlayList are not directly saved in db
        em.detach(updatedPlayList);
        updatedPlayList
            .name(UPDATED_NAME)
            .slug(UPDATED_SLUG)
            .type(UPDATED_TYPE)
            .length(UPDATED_LENGTH)
            .duration(UPDATED_DURATION)
            .tagLine(UPDATED_TAG_LINE)
            .active(UPDATED_ACTIVE);
        PlayListDTO playListDTO = playListMapper.toDto(updatedPlayList);

        restPlayListMockMvc.perform(put("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playListDTO)))
            .andExpect(status().isOk());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeUpdate);
        PlayList testPlayList = playListList.get(playListList.size() - 1);
        assertThat(testPlayList.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlayList.getSlug()).isEqualTo(UPDATED_SLUG);
        assertThat(testPlayList.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPlayList.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testPlayList.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testPlayList.getTagLine()).isEqualTo(UPDATED_TAG_LINE);
        assertThat(testPlayList.isActive()).isEqualTo(UPDATED_ACTIVE);

        // Validate the PlayList in Elasticsearch
        PlayList playListEs = playListSearchRepository.findOne(testPlayList.getId());
        assertThat(playListEs).isEqualToIgnoringGivenFields(testPlayList);
    }

    @Test
    @Transactional
    public void updateNonExistingPlayList() throws Exception {
        int databaseSizeBeforeUpdate = playListRepository.findAll().size();

        // Create the PlayList
        PlayListDTO playListDTO = playListMapper.toDto(playList);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPlayListMockMvc.perform(put("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playListDTO)))
            .andExpect(status().isCreated());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePlayList() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);
        playListSearchRepository.save(playList);
        int databaseSizeBeforeDelete = playListRepository.findAll().size();

        // Get the playList
        restPlayListMockMvc.perform(delete("/api/play-lists/{id}", playList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean playListExistsInEs = playListSearchRepository.exists(playList.getId());
        assertThat(playListExistsInEs).isFalse();

        // Validate the database is empty
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPlayList() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);
        playListSearchRepository.save(playList);

        // Search the playList
        restPlayListMockMvc.perform(get("/api/_search/play-lists?query=id:" + playList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].slug").value(hasItem(DEFAULT_SLUG.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())))
            .andExpect(jsonPath("$.[*].tagLine").value(hasItem(DEFAULT_TAG_LINE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlayList.class);
        PlayList playList1 = new PlayList();
        playList1.setId(1L);
        PlayList playList2 = new PlayList();
        playList2.setId(playList1.getId());
        assertThat(playList1).isEqualTo(playList2);
        playList2.setId(2L);
        assertThat(playList1).isNotEqualTo(playList2);
        playList1.setId(null);
        assertThat(playList1).isNotEqualTo(playList2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlayListDTO.class);
        PlayListDTO playListDTO1 = new PlayListDTO();
        playListDTO1.setId(1L);
        PlayListDTO playListDTO2 = new PlayListDTO();
        assertThat(playListDTO1).isNotEqualTo(playListDTO2);
        playListDTO2.setId(playListDTO1.getId());
        assertThat(playListDTO1).isEqualTo(playListDTO2);
        playListDTO2.setId(2L);
        assertThat(playListDTO1).isNotEqualTo(playListDTO2);
        playListDTO1.setId(null);
        assertThat(playListDTO1).isNotEqualTo(playListDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(playListMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(playListMapper.fromId(null)).isNull();
    }
}

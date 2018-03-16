package com.elearningportal.apps.web.rest;

import com.elearningportal.apps.ELearningApp;

import com.elearningportal.apps.domain.GalleryGroup;
import com.elearningportal.apps.repository.GalleryGroupRepository;
import com.elearningportal.apps.repository.search.GalleryGroupSearchRepository;
import com.elearningportal.apps.service.dto.GalleryGroupDTO;
import com.elearningportal.apps.service.mapper.GalleryGroupMapper;
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
 * Test class for the GalleryGroupResource REST controller.
 *
 * @see GalleryGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class GalleryGroupResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GalleryGroupRepository galleryGroupRepository;

    @Autowired
    private GalleryGroupMapper galleryGroupMapper;

    @Autowired
    private GalleryGroupSearchRepository galleryGroupSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGalleryGroupMockMvc;

    private GalleryGroup galleryGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GalleryGroupResource galleryGroupResource = new GalleryGroupResource(galleryGroupRepository, galleryGroupMapper, galleryGroupSearchRepository);
        this.restGalleryGroupMockMvc = MockMvcBuilders.standaloneSetup(galleryGroupResource)
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
    public static GalleryGroup createEntity(EntityManager em) {
        GalleryGroup galleryGroup = new GalleryGroup()
            .name(DEFAULT_NAME);
        return galleryGroup;
    }

    @Before
    public void initTest() {
        galleryGroupSearchRepository.deleteAll();
        galleryGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createGalleryGroup() throws Exception {
        int databaseSizeBeforeCreate = galleryGroupRepository.findAll().size();

        // Create the GalleryGroup
        GalleryGroupDTO galleryGroupDTO = galleryGroupMapper.toDto(galleryGroup);
        restGalleryGroupMockMvc.perform(post("/api/gallery-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(galleryGroupDTO)))
            .andExpect(status().isCreated());

        // Validate the GalleryGroup in the database
        List<GalleryGroup> galleryGroupList = galleryGroupRepository.findAll();
        assertThat(galleryGroupList).hasSize(databaseSizeBeforeCreate + 1);
        GalleryGroup testGalleryGroup = galleryGroupList.get(galleryGroupList.size() - 1);
        assertThat(testGalleryGroup.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the GalleryGroup in Elasticsearch
        GalleryGroup galleryGroupEs = galleryGroupSearchRepository.findOne(testGalleryGroup.getId());
        assertThat(galleryGroupEs).isEqualToIgnoringGivenFields(testGalleryGroup);
    }

    @Test
    @Transactional
    public void createGalleryGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = galleryGroupRepository.findAll().size();

        // Create the GalleryGroup with an existing ID
        galleryGroup.setId(1L);
        GalleryGroupDTO galleryGroupDTO = galleryGroupMapper.toDto(galleryGroup);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGalleryGroupMockMvc.perform(post("/api/gallery-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(galleryGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GalleryGroup in the database
        List<GalleryGroup> galleryGroupList = galleryGroupRepository.findAll();
        assertThat(galleryGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGalleryGroups() throws Exception {
        // Initialize the database
        galleryGroupRepository.saveAndFlush(galleryGroup);

        // Get all the galleryGroupList
        restGalleryGroupMockMvc.perform(get("/api/gallery-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(galleryGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getGalleryGroup() throws Exception {
        // Initialize the database
        galleryGroupRepository.saveAndFlush(galleryGroup);

        // Get the galleryGroup
        restGalleryGroupMockMvc.perform(get("/api/gallery-groups/{id}", galleryGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(galleryGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGalleryGroup() throws Exception {
        // Get the galleryGroup
        restGalleryGroupMockMvc.perform(get("/api/gallery-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGalleryGroup() throws Exception {
        // Initialize the database
        galleryGroupRepository.saveAndFlush(galleryGroup);
        galleryGroupSearchRepository.save(galleryGroup);
        int databaseSizeBeforeUpdate = galleryGroupRepository.findAll().size();

        // Update the galleryGroup
        GalleryGroup updatedGalleryGroup = galleryGroupRepository.findOne(galleryGroup.getId());
        // Disconnect from session so that the updates on updatedGalleryGroup are not directly saved in db
        em.detach(updatedGalleryGroup);
        updatedGalleryGroup
            .name(UPDATED_NAME);
        GalleryGroupDTO galleryGroupDTO = galleryGroupMapper.toDto(updatedGalleryGroup);

        restGalleryGroupMockMvc.perform(put("/api/gallery-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(galleryGroupDTO)))
            .andExpect(status().isOk());

        // Validate the GalleryGroup in the database
        List<GalleryGroup> galleryGroupList = galleryGroupRepository.findAll();
        assertThat(galleryGroupList).hasSize(databaseSizeBeforeUpdate);
        GalleryGroup testGalleryGroup = galleryGroupList.get(galleryGroupList.size() - 1);
        assertThat(testGalleryGroup.getName()).isEqualTo(UPDATED_NAME);

        // Validate the GalleryGroup in Elasticsearch
        GalleryGroup galleryGroupEs = galleryGroupSearchRepository.findOne(testGalleryGroup.getId());
        assertThat(galleryGroupEs).isEqualToIgnoringGivenFields(testGalleryGroup);
    }

    @Test
    @Transactional
    public void updateNonExistingGalleryGroup() throws Exception {
        int databaseSizeBeforeUpdate = galleryGroupRepository.findAll().size();

        // Create the GalleryGroup
        GalleryGroupDTO galleryGroupDTO = galleryGroupMapper.toDto(galleryGroup);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGalleryGroupMockMvc.perform(put("/api/gallery-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(galleryGroupDTO)))
            .andExpect(status().isCreated());

        // Validate the GalleryGroup in the database
        List<GalleryGroup> galleryGroupList = galleryGroupRepository.findAll();
        assertThat(galleryGroupList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGalleryGroup() throws Exception {
        // Initialize the database
        galleryGroupRepository.saveAndFlush(galleryGroup);
        galleryGroupSearchRepository.save(galleryGroup);
        int databaseSizeBeforeDelete = galleryGroupRepository.findAll().size();

        // Get the galleryGroup
        restGalleryGroupMockMvc.perform(delete("/api/gallery-groups/{id}", galleryGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean galleryGroupExistsInEs = galleryGroupSearchRepository.exists(galleryGroup.getId());
        assertThat(galleryGroupExistsInEs).isFalse();

        // Validate the database is empty
        List<GalleryGroup> galleryGroupList = galleryGroupRepository.findAll();
        assertThat(galleryGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchGalleryGroup() throws Exception {
        // Initialize the database
        galleryGroupRepository.saveAndFlush(galleryGroup);
        galleryGroupSearchRepository.save(galleryGroup);

        // Search the galleryGroup
        restGalleryGroupMockMvc.perform(get("/api/_search/gallery-groups?query=id:" + galleryGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(galleryGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GalleryGroup.class);
        GalleryGroup galleryGroup1 = new GalleryGroup();
        galleryGroup1.setId(1L);
        GalleryGroup galleryGroup2 = new GalleryGroup();
        galleryGroup2.setId(galleryGroup1.getId());
        assertThat(galleryGroup1).isEqualTo(galleryGroup2);
        galleryGroup2.setId(2L);
        assertThat(galleryGroup1).isNotEqualTo(galleryGroup2);
        galleryGroup1.setId(null);
        assertThat(galleryGroup1).isNotEqualTo(galleryGroup2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GalleryGroupDTO.class);
        GalleryGroupDTO galleryGroupDTO1 = new GalleryGroupDTO();
        galleryGroupDTO1.setId(1L);
        GalleryGroupDTO galleryGroupDTO2 = new GalleryGroupDTO();
        assertThat(galleryGroupDTO1).isNotEqualTo(galleryGroupDTO2);
        galleryGroupDTO2.setId(galleryGroupDTO1.getId());
        assertThat(galleryGroupDTO1).isEqualTo(galleryGroupDTO2);
        galleryGroupDTO2.setId(2L);
        assertThat(galleryGroupDTO1).isNotEqualTo(galleryGroupDTO2);
        galleryGroupDTO1.setId(null);
        assertThat(galleryGroupDTO1).isNotEqualTo(galleryGroupDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(galleryGroupMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(galleryGroupMapper.fromId(null)).isNull();
    }
}

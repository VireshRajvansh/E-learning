package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.GalleryGroup;

import com.elearningportal.apps.repository.GalleryGroupRepository;
import com.elearningportal.apps.repository.search.GalleryGroupSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.GalleryGroupDTO;
import com.elearningportal.apps.service.mapper.GalleryGroupMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing GalleryGroup.
 */
@RestController
@RequestMapping("/api")
public class GalleryGroupResource {

    private final Logger log = LoggerFactory.getLogger(GalleryGroupResource.class);

    private static final String ENTITY_NAME = "galleryGroup";

    private final GalleryGroupRepository galleryGroupRepository;

    private final GalleryGroupMapper galleryGroupMapper;

    private final GalleryGroupSearchRepository galleryGroupSearchRepository;

    public GalleryGroupResource(GalleryGroupRepository galleryGroupRepository, GalleryGroupMapper galleryGroupMapper, GalleryGroupSearchRepository galleryGroupSearchRepository) {
        this.galleryGroupRepository = galleryGroupRepository;
        this.galleryGroupMapper = galleryGroupMapper;
        this.galleryGroupSearchRepository = galleryGroupSearchRepository;
    }

    /**
     * POST  /gallery-groups : Create a new galleryGroup.
     *
     * @param galleryGroupDTO the galleryGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new galleryGroupDTO, or with status 400 (Bad Request) if the galleryGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gallery-groups")
    @Timed
    public ResponseEntity<GalleryGroupDTO> createGalleryGroup(@RequestBody GalleryGroupDTO galleryGroupDTO) throws URISyntaxException {
        log.debug("REST request to save GalleryGroup : {}", galleryGroupDTO);
        if (galleryGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new galleryGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GalleryGroup galleryGroup = galleryGroupMapper.toEntity(galleryGroupDTO);
        galleryGroup = galleryGroupRepository.save(galleryGroup);
        GalleryGroupDTO result = galleryGroupMapper.toDto(galleryGroup);
        galleryGroupSearchRepository.save(galleryGroup);
        return ResponseEntity.created(new URI("/api/gallery-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gallery-groups : Updates an existing galleryGroup.
     *
     * @param galleryGroupDTO the galleryGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated galleryGroupDTO,
     * or with status 400 (Bad Request) if the galleryGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the galleryGroupDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gallery-groups")
    @Timed
    public ResponseEntity<GalleryGroupDTO> updateGalleryGroup(@RequestBody GalleryGroupDTO galleryGroupDTO) throws URISyntaxException {
        log.debug("REST request to update GalleryGroup : {}", galleryGroupDTO);
        if (galleryGroupDTO.getId() == null) {
            return createGalleryGroup(galleryGroupDTO);
        }
        GalleryGroup galleryGroup = galleryGroupMapper.toEntity(galleryGroupDTO);
        galleryGroup = galleryGroupRepository.save(galleryGroup);
        GalleryGroupDTO result = galleryGroupMapper.toDto(galleryGroup);
        galleryGroupSearchRepository.save(galleryGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, galleryGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gallery-groups : get all the galleryGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of galleryGroups in body
     */
    @GetMapping("/gallery-groups")
    @Timed
    public ResponseEntity<List<GalleryGroupDTO>> getAllGalleryGroups(Pageable pageable) {
        log.debug("REST request to get a page of GalleryGroups");
        Page<GalleryGroup> page = galleryGroupRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/gallery-groups");
        return new ResponseEntity<>(galleryGroupMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /gallery-groups/:id : get the "id" galleryGroup.
     *
     * @param id the id of the galleryGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the galleryGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gallery-groups/{id}")
    @Timed
    public ResponseEntity<GalleryGroupDTO> getGalleryGroup(@PathVariable Long id) {
        log.debug("REST request to get GalleryGroup : {}", id);
        GalleryGroup galleryGroup = galleryGroupRepository.findOne(id);
        GalleryGroupDTO galleryGroupDTO = galleryGroupMapper.toDto(galleryGroup);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(galleryGroupDTO));
    }

    /**
     * DELETE  /gallery-groups/:id : delete the "id" galleryGroup.
     *
     * @param id the id of the galleryGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gallery-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteGalleryGroup(@PathVariable Long id) {
        log.debug("REST request to delete GalleryGroup : {}", id);
        galleryGroupRepository.delete(id);
        galleryGroupSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/gallery-groups?query=:query : search for the galleryGroup corresponding
     * to the query.
     *
     * @param query the query of the galleryGroup search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/gallery-groups")
    @Timed
    public ResponseEntity<List<GalleryGroupDTO>> searchGalleryGroups(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of GalleryGroups for query {}", query);
        Page<GalleryGroup> page = galleryGroupSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/gallery-groups");
        return new ResponseEntity<>(galleryGroupMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.Gallery;

import com.elearningportal.apps.repository.GalleryRepository;
import com.elearningportal.apps.repository.search.GallerySearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.GalleryDTO;
import com.elearningportal.apps.service.mapper.GalleryMapper;
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
 * REST controller for managing Gallery.
 */
@RestController
@RequestMapping("/api")
public class GalleryResource {

    private final Logger log = LoggerFactory.getLogger(GalleryResource.class);

    private static final String ENTITY_NAME = "gallery";

    private final GalleryRepository galleryRepository;

    private final GalleryMapper galleryMapper;

    private final GallerySearchRepository gallerySearchRepository;

    public GalleryResource(GalleryRepository galleryRepository, GalleryMapper galleryMapper, GallerySearchRepository gallerySearchRepository) {
        this.galleryRepository = galleryRepository;
        this.galleryMapper = galleryMapper;
        this.gallerySearchRepository = gallerySearchRepository;
    }

    /**
     * POST  /galleries : Create a new gallery.
     *
     * @param galleryDTO the galleryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new galleryDTO, or with status 400 (Bad Request) if the gallery has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/galleries")
    @Timed
    public ResponseEntity<GalleryDTO> createGallery(@RequestBody GalleryDTO galleryDTO) throws URISyntaxException {
        log.debug("REST request to save Gallery : {}", galleryDTO);
        if (galleryDTO.getId() != null) {
            throw new BadRequestAlertException("A new gallery cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gallery gallery = galleryMapper.toEntity(galleryDTO);
        gallery = galleryRepository.save(gallery);
        GalleryDTO result = galleryMapper.toDto(gallery);
        gallerySearchRepository.save(gallery);
        return ResponseEntity.created(new URI("/api/galleries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /galleries : Updates an existing gallery.
     *
     * @param galleryDTO the galleryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated galleryDTO,
     * or with status 400 (Bad Request) if the galleryDTO is not valid,
     * or with status 500 (Internal Server Error) if the galleryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/galleries")
    @Timed
    public ResponseEntity<GalleryDTO> updateGallery(@RequestBody GalleryDTO galleryDTO) throws URISyntaxException {
        log.debug("REST request to update Gallery : {}", galleryDTO);
        if (galleryDTO.getId() == null) {
            return createGallery(galleryDTO);
        }
        Gallery gallery = galleryMapper.toEntity(galleryDTO);
        gallery = galleryRepository.save(gallery);
        GalleryDTO result = galleryMapper.toDto(gallery);
        gallerySearchRepository.save(gallery);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, galleryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /galleries : get all the galleries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of galleries in body
     */
    @GetMapping("/galleries")
    @Timed
    public ResponseEntity<List<GalleryDTO>> getAllGalleries(Pageable pageable) {
        log.debug("REST request to get a page of Galleries");
        Page<Gallery> page = galleryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/galleries");
        return new ResponseEntity<>(galleryMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /galleries/:id : get the "id" gallery.
     *
     * @param id the id of the galleryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the galleryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/galleries/{id}")
    @Timed
    public ResponseEntity<GalleryDTO> getGallery(@PathVariable Long id) {
        log.debug("REST request to get Gallery : {}", id);
        Gallery gallery = galleryRepository.findOne(id);
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(galleryDTO));
    }

    /**
     * DELETE  /galleries/:id : delete the "id" gallery.
     *
     * @param id the id of the galleryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/galleries/{id}")
    @Timed
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        log.debug("REST request to delete Gallery : {}", id);
        galleryRepository.delete(id);
        gallerySearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/galleries?query=:query : search for the gallery corresponding
     * to the query.
     *
     * @param query the query of the gallery search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/galleries")
    @Timed
    public ResponseEntity<List<GalleryDTO>> searchGalleries(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Galleries for query {}", query);
        Page<Gallery> page = gallerySearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/galleries");
        return new ResponseEntity<>(galleryMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

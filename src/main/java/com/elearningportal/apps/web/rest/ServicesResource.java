package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.Services;

import com.elearningportal.apps.repository.ServicesRepository;
import com.elearningportal.apps.repository.search.ServicesSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.ServicesDTO;
import com.elearningportal.apps.service.mapper.ServicesMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Services.
 */
@RestController
@RequestMapping("/api")
public class ServicesResource {

    private final Logger log = LoggerFactory.getLogger(ServicesResource.class);

    private static final String ENTITY_NAME = "services";

    private final ServicesRepository servicesRepository;

    private final ServicesMapper servicesMapper;

    private final ServicesSearchRepository servicesSearchRepository;

    public ServicesResource(ServicesRepository servicesRepository, ServicesMapper servicesMapper, ServicesSearchRepository servicesSearchRepository) {
        this.servicesRepository = servicesRepository;
        this.servicesMapper = servicesMapper;
        this.servicesSearchRepository = servicesSearchRepository;
    }

    /**
     * POST  /services : Create a new services.
     *
     * @param servicesDTO the servicesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new servicesDTO, or with status 400 (Bad Request) if the services has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/services")
    @Timed
    public ResponseEntity<ServicesDTO> createServices(@Valid @RequestBody ServicesDTO servicesDTO) throws URISyntaxException {
        log.debug("REST request to save Services : {}", servicesDTO);
        if (servicesDTO.getId() != null) {
            throw new BadRequestAlertException("A new services cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Services services = servicesMapper.toEntity(servicesDTO);
        services = servicesRepository.save(services);
        ServicesDTO result = servicesMapper.toDto(services);
        servicesSearchRepository.save(services);
        return ResponseEntity.created(new URI("/api/services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /services : Updates an existing services.
     *
     * @param servicesDTO the servicesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated servicesDTO,
     * or with status 400 (Bad Request) if the servicesDTO is not valid,
     * or with status 500 (Internal Server Error) if the servicesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/services")
    @Timed
    public ResponseEntity<ServicesDTO> updateServices(@Valid @RequestBody ServicesDTO servicesDTO) throws URISyntaxException {
        log.debug("REST request to update Services : {}", servicesDTO);
        if (servicesDTO.getId() == null) {
            return createServices(servicesDTO);
        }
        Services services = servicesMapper.toEntity(servicesDTO);
        services = servicesRepository.save(services);
        ServicesDTO result = servicesMapper.toDto(services);
        servicesSearchRepository.save(services);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, servicesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /services : get all the services.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of services in body
     */
    @GetMapping("/services")
    @Timed
    public ResponseEntity<List<ServicesDTO>> getAllServices(Pageable pageable) {
        log.debug("REST request to get a page of Services");
        Page<Services> page = servicesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/services");
        return new ResponseEntity<>(servicesMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /services/:id : get the "id" services.
     *
     * @param id the id of the servicesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the servicesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/services/{id}")
    @Timed
    public ResponseEntity<ServicesDTO> getServices(@PathVariable Long id) {
        log.debug("REST request to get Services : {}", id);
        Services services = servicesRepository.findOne(id);
        ServicesDTO servicesDTO = servicesMapper.toDto(services);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(servicesDTO));
    }

    /**
     * DELETE  /services/:id : delete the "id" services.
     *
     * @param id the id of the servicesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/services/{id}")
    @Timed
    public ResponseEntity<Void> deleteServices(@PathVariable Long id) {
        log.debug("REST request to delete Services : {}", id);
        servicesRepository.delete(id);
        servicesSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/services?query=:query : search for the services corresponding
     * to the query.
     *
     * @param query the query of the services search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/services")
    @Timed
    public ResponseEntity<List<ServicesDTO>> searchServices(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Services for query {}", query);
        Page<Services> page = servicesSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/services");
        return new ResponseEntity<>(servicesMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

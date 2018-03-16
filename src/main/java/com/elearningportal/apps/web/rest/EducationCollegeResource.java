package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.EducationCollege;

import com.elearningportal.apps.repository.EducationCollegeRepository;
import com.elearningportal.apps.repository.search.EducationCollegeSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.EducationCollegeDTO;
import com.elearningportal.apps.service.mapper.EducationCollegeMapper;
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
 * REST controller for managing EducationCollege.
 */
@RestController
@RequestMapping("/api")
public class EducationCollegeResource {

    private final Logger log = LoggerFactory.getLogger(EducationCollegeResource.class);

    private static final String ENTITY_NAME = "educationCollege";

    private final EducationCollegeRepository educationCollegeRepository;

    private final EducationCollegeMapper educationCollegeMapper;

    private final EducationCollegeSearchRepository educationCollegeSearchRepository;

    public EducationCollegeResource(EducationCollegeRepository educationCollegeRepository, EducationCollegeMapper educationCollegeMapper, EducationCollegeSearchRepository educationCollegeSearchRepository) {
        this.educationCollegeRepository = educationCollegeRepository;
        this.educationCollegeMapper = educationCollegeMapper;
        this.educationCollegeSearchRepository = educationCollegeSearchRepository;
    }

    /**
     * POST  /education-colleges : Create a new educationCollege.
     *
     * @param educationCollegeDTO the educationCollegeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new educationCollegeDTO, or with status 400 (Bad Request) if the educationCollege has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/education-colleges")
    @Timed
    public ResponseEntity<EducationCollegeDTO> createEducationCollege(@Valid @RequestBody EducationCollegeDTO educationCollegeDTO) throws URISyntaxException {
        log.debug("REST request to save EducationCollege : {}", educationCollegeDTO);
        if (educationCollegeDTO.getId() != null) {
            throw new BadRequestAlertException("A new educationCollege cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EducationCollege educationCollege = educationCollegeMapper.toEntity(educationCollegeDTO);
        educationCollege = educationCollegeRepository.save(educationCollege);
        EducationCollegeDTO result = educationCollegeMapper.toDto(educationCollege);
        educationCollegeSearchRepository.save(educationCollege);
        return ResponseEntity.created(new URI("/api/education-colleges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /education-colleges : Updates an existing educationCollege.
     *
     * @param educationCollegeDTO the educationCollegeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated educationCollegeDTO,
     * or with status 400 (Bad Request) if the educationCollegeDTO is not valid,
     * or with status 500 (Internal Server Error) if the educationCollegeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/education-colleges")
    @Timed
    public ResponseEntity<EducationCollegeDTO> updateEducationCollege(@Valid @RequestBody EducationCollegeDTO educationCollegeDTO) throws URISyntaxException {
        log.debug("REST request to update EducationCollege : {}", educationCollegeDTO);
        if (educationCollegeDTO.getId() == null) {
            return createEducationCollege(educationCollegeDTO);
        }
        EducationCollege educationCollege = educationCollegeMapper.toEntity(educationCollegeDTO);
        educationCollege = educationCollegeRepository.save(educationCollege);
        EducationCollegeDTO result = educationCollegeMapper.toDto(educationCollege);
        educationCollegeSearchRepository.save(educationCollege);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, educationCollegeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /education-colleges : get all the educationColleges.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of educationColleges in body
     */
    @GetMapping("/education-colleges")
    @Timed
    public ResponseEntity<List<EducationCollegeDTO>> getAllEducationColleges(Pageable pageable) {
        log.debug("REST request to get a page of EducationColleges");
        Page<EducationCollege> page = educationCollegeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/education-colleges");
        return new ResponseEntity<>(educationCollegeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /education-colleges/:id : get the "id" educationCollege.
     *
     * @param id the id of the educationCollegeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the educationCollegeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/education-colleges/{id}")
    @Timed
    public ResponseEntity<EducationCollegeDTO> getEducationCollege(@PathVariable Long id) {
        log.debug("REST request to get EducationCollege : {}", id);
        EducationCollege educationCollege = educationCollegeRepository.findOne(id);
        EducationCollegeDTO educationCollegeDTO = educationCollegeMapper.toDto(educationCollege);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(educationCollegeDTO));
    }

    /**
     * DELETE  /education-colleges/:id : delete the "id" educationCollege.
     *
     * @param id the id of the educationCollegeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/education-colleges/{id}")
    @Timed
    public ResponseEntity<Void> deleteEducationCollege(@PathVariable Long id) {
        log.debug("REST request to delete EducationCollege : {}", id);
        educationCollegeRepository.delete(id);
        educationCollegeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/education-colleges?query=:query : search for the educationCollege corresponding
     * to the query.
     *
     * @param query the query of the educationCollege search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/education-colleges")
    @Timed
    public ResponseEntity<List<EducationCollegeDTO>> searchEducationColleges(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of EducationColleges for query {}", query);
        Page<EducationCollege> page = educationCollegeSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/education-colleges");
        return new ResponseEntity<>(educationCollegeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

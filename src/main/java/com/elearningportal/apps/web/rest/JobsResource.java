package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.Jobs;

import com.elearningportal.apps.repository.JobsRepository;
import com.elearningportal.apps.repository.search.JobsSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.JobsDTO;
import com.elearningportal.apps.service.mapper.JobsMapper;
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
 * REST controller for managing Jobs.
 */
@RestController
@RequestMapping("/api")
public class JobsResource {

    private final Logger log = LoggerFactory.getLogger(JobsResource.class);

    private static final String ENTITY_NAME = "jobs";

    private final JobsRepository jobsRepository;

    private final JobsMapper jobsMapper;

    private final JobsSearchRepository jobsSearchRepository;

    public JobsResource(JobsRepository jobsRepository, JobsMapper jobsMapper, JobsSearchRepository jobsSearchRepository) {
        this.jobsRepository = jobsRepository;
        this.jobsMapper = jobsMapper;
        this.jobsSearchRepository = jobsSearchRepository;
    }

    /**
     * POST  /jobs : Create a new jobs.
     *
     * @param jobsDTO the jobsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobsDTO, or with status 400 (Bad Request) if the jobs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobs")
    @Timed
    public ResponseEntity<JobsDTO> createJobs(@RequestBody JobsDTO jobsDTO) throws URISyntaxException {
        log.debug("REST request to save Jobs : {}", jobsDTO);
        if (jobsDTO.getId() != null) {
            throw new BadRequestAlertException("A new jobs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Jobs jobs = jobsMapper.toEntity(jobsDTO);
        jobs = jobsRepository.save(jobs);
        JobsDTO result = jobsMapper.toDto(jobs);
        jobsSearchRepository.save(jobs);
        return ResponseEntity.created(new URI("/api/jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobs : Updates an existing jobs.
     *
     * @param jobsDTO the jobsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobsDTO,
     * or with status 400 (Bad Request) if the jobsDTO is not valid,
     * or with status 500 (Internal Server Error) if the jobsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobs")
    @Timed
    public ResponseEntity<JobsDTO> updateJobs(@RequestBody JobsDTO jobsDTO) throws URISyntaxException {
        log.debug("REST request to update Jobs : {}", jobsDTO);
        if (jobsDTO.getId() == null) {
            return createJobs(jobsDTO);
        }
        Jobs jobs = jobsMapper.toEntity(jobsDTO);
        jobs = jobsRepository.save(jobs);
        JobsDTO result = jobsMapper.toDto(jobs);
        jobsSearchRepository.save(jobs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobs : get all the jobs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jobs in body
     */
    @GetMapping("/jobs")
    @Timed
    public ResponseEntity<List<JobsDTO>> getAllJobs(Pageable pageable) {
        log.debug("REST request to get a page of Jobs");
        Page<Jobs> page = jobsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/jobs");
        return new ResponseEntity<>(jobsMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /jobs/:id : get the "id" jobs.
     *
     * @param id the id of the jobsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<JobsDTO> getJobs(@PathVariable Long id) {
        log.debug("REST request to get Jobs : {}", id);
        Jobs jobs = jobsRepository.findOne(id);
        JobsDTO jobsDTO = jobsMapper.toDto(jobs);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobsDTO));
    }

    /**
     * DELETE  /jobs/:id : delete the "id" jobs.
     *
     * @param id the id of the jobsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobs(@PathVariable Long id) {
        log.debug("REST request to delete Jobs : {}", id);
        jobsRepository.delete(id);
        jobsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/jobs?query=:query : search for the jobs corresponding
     * to the query.
     *
     * @param query the query of the jobs search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/jobs")
    @Timed
    public ResponseEntity<List<JobsDTO>> searchJobs(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Jobs for query {}", query);
        Page<Jobs> page = jobsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/jobs");
        return new ResponseEntity<>(jobsMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

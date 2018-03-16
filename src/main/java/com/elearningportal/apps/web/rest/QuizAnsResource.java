package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.QuizAns;

import com.elearningportal.apps.repository.QuizAnsRepository;
import com.elearningportal.apps.repository.search.QuizAnsSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.QuizAnsDTO;
import com.elearningportal.apps.service.mapper.QuizAnsMapper;
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
 * REST controller for managing QuizAns.
 */
@RestController
@RequestMapping("/api")
public class QuizAnsResource {

    private final Logger log = LoggerFactory.getLogger(QuizAnsResource.class);

    private static final String ENTITY_NAME = "quizAns";

    private final QuizAnsRepository quizAnsRepository;

    private final QuizAnsMapper quizAnsMapper;

    private final QuizAnsSearchRepository quizAnsSearchRepository;

    public QuizAnsResource(QuizAnsRepository quizAnsRepository, QuizAnsMapper quizAnsMapper, QuizAnsSearchRepository quizAnsSearchRepository) {
        this.quizAnsRepository = quizAnsRepository;
        this.quizAnsMapper = quizAnsMapper;
        this.quizAnsSearchRepository = quizAnsSearchRepository;
    }

    /**
     * POST  /quiz-ans : Create a new quizAns.
     *
     * @param quizAnsDTO the quizAnsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new quizAnsDTO, or with status 400 (Bad Request) if the quizAns has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/quiz-ans")
    @Timed
    public ResponseEntity<QuizAnsDTO> createQuizAns(@RequestBody QuizAnsDTO quizAnsDTO) throws URISyntaxException {
        log.debug("REST request to save QuizAns : {}", quizAnsDTO);
        if (quizAnsDTO.getId() != null) {
            throw new BadRequestAlertException("A new quizAns cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuizAns quizAns = quizAnsMapper.toEntity(quizAnsDTO);
        quizAns = quizAnsRepository.save(quizAns);
        QuizAnsDTO result = quizAnsMapper.toDto(quizAns);
        quizAnsSearchRepository.save(quizAns);
        return ResponseEntity.created(new URI("/api/quiz-ans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /quiz-ans : Updates an existing quizAns.
     *
     * @param quizAnsDTO the quizAnsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated quizAnsDTO,
     * or with status 400 (Bad Request) if the quizAnsDTO is not valid,
     * or with status 500 (Internal Server Error) if the quizAnsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/quiz-ans")
    @Timed
    public ResponseEntity<QuizAnsDTO> updateQuizAns(@RequestBody QuizAnsDTO quizAnsDTO) throws URISyntaxException {
        log.debug("REST request to update QuizAns : {}", quizAnsDTO);
        if (quizAnsDTO.getId() == null) {
            return createQuizAns(quizAnsDTO);
        }
        QuizAns quizAns = quizAnsMapper.toEntity(quizAnsDTO);
        quizAns = quizAnsRepository.save(quizAns);
        QuizAnsDTO result = quizAnsMapper.toDto(quizAns);
        quizAnsSearchRepository.save(quizAns);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, quizAnsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /quiz-ans : get all the quizAns.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of quizAns in body
     */
    @GetMapping("/quiz-ans")
    @Timed
    public ResponseEntity<List<QuizAnsDTO>> getAllQuizAns(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("quiz-is-null".equals(filter)) {
            log.debug("REST request to get all QuizAnss where quiz is null");
            return new ResponseEntity<>(StreamSupport
                .stream(quizAnsRepository.findAll().spliterator(), false)
                .filter(quizAns -> quizAns.getQuiz() == null)
                .map(quizAnsMapper::toDto)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of QuizAns");
        Page<QuizAns> page = quizAnsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/quiz-ans");
        return new ResponseEntity<>(quizAnsMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /quiz-ans/:id : get the "id" quizAns.
     *
     * @param id the id of the quizAnsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the quizAnsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/quiz-ans/{id}")
    @Timed
    public ResponseEntity<QuizAnsDTO> getQuizAns(@PathVariable Long id) {
        log.debug("REST request to get QuizAns : {}", id);
        QuizAns quizAns = quizAnsRepository.findOne(id);
        QuizAnsDTO quizAnsDTO = quizAnsMapper.toDto(quizAns);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(quizAnsDTO));
    }

    /**
     * DELETE  /quiz-ans/:id : delete the "id" quizAns.
     *
     * @param id the id of the quizAnsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quiz-ans/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuizAns(@PathVariable Long id) {
        log.debug("REST request to delete QuizAns : {}", id);
        quizAnsRepository.delete(id);
        quizAnsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/quiz-ans?query=:query : search for the quizAns corresponding
     * to the query.
     *
     * @param query the query of the quizAns search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/quiz-ans")
    @Timed
    public ResponseEntity<List<QuizAnsDTO>> searchQuizAns(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of QuizAns for query {}", query);
        Page<QuizAns> page = quizAnsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/quiz-ans");
        return new ResponseEntity<>(quizAnsMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

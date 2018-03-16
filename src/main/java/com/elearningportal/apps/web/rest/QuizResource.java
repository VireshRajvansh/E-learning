package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.Quiz;

import com.elearningportal.apps.repository.QuizRepository;
import com.elearningportal.apps.repository.search.QuizSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.QuizDTO;
import com.elearningportal.apps.service.mapper.QuizMapper;
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
 * REST controller for managing Quiz.
 */
@RestController
@RequestMapping("/api")
public class QuizResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);

    private static final String ENTITY_NAME = "quiz";

    private final QuizRepository quizRepository;

    private final QuizMapper quizMapper;

    private final QuizSearchRepository quizSearchRepository;

    public QuizResource(QuizRepository quizRepository, QuizMapper quizMapper, QuizSearchRepository quizSearchRepository) {
        this.quizRepository = quizRepository;
        this.quizMapper = quizMapper;
        this.quizSearchRepository = quizSearchRepository;
    }

    /**
     * POST  /quizzes : Create a new quiz.
     *
     * @param quizDTO the quizDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new quizDTO, or with status 400 (Bad Request) if the quiz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/quizzes")
    @Timed
    public ResponseEntity<QuizDTO> createQuiz(@Valid @RequestBody QuizDTO quizDTO) throws URISyntaxException {
        log.debug("REST request to save Quiz : {}", quizDTO);
        if (quizDTO.getId() != null) {
            throw new BadRequestAlertException("A new quiz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Quiz quiz = quizMapper.toEntity(quizDTO);
        quiz = quizRepository.save(quiz);
        QuizDTO result = quizMapper.toDto(quiz);
        quizSearchRepository.save(quiz);
        return ResponseEntity.created(new URI("/api/quizzes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /quizzes : Updates an existing quiz.
     *
     * @param quizDTO the quizDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated quizDTO,
     * or with status 400 (Bad Request) if the quizDTO is not valid,
     * or with status 500 (Internal Server Error) if the quizDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/quizzes")
    @Timed
    public ResponseEntity<QuizDTO> updateQuiz(@Valid @RequestBody QuizDTO quizDTO) throws URISyntaxException {
        log.debug("REST request to update Quiz : {}", quizDTO);
        if (quizDTO.getId() == null) {
            return createQuiz(quizDTO);
        }
        Quiz quiz = quizMapper.toEntity(quizDTO);
        quiz = quizRepository.save(quiz);
        QuizDTO result = quizMapper.toDto(quiz);
        quizSearchRepository.save(quiz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, quizDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /quizzes : get all the quizzes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of quizzes in body
     */
    @GetMapping("/quizzes")
    @Timed
    public ResponseEntity<List<QuizDTO>> getAllQuizzes(Pageable pageable) {
        log.debug("REST request to get a page of Quizzes");
        Page<Quiz> page = quizRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/quizzes");
        return new ResponseEntity<>(quizMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /quizzes/:id : get the "id" quiz.
     *
     * @param id the id of the quizDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the quizDTO, or with status 404 (Not Found)
     */
    @GetMapping("/quizzes/{id}")
    @Timed
    public ResponseEntity<QuizDTO> getQuiz(@PathVariable Long id) {
        log.debug("REST request to get Quiz : {}", id);
        Quiz quiz = quizRepository.findOne(id);
        QuizDTO quizDTO = quizMapper.toDto(quiz);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(quizDTO));
    }

    /**
     * DELETE  /quizzes/:id : delete the "id" quiz.
     *
     * @param id the id of the quizDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quizzes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        log.debug("REST request to delete Quiz : {}", id);
        quizRepository.delete(id);
        quizSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/quizzes?query=:query : search for the quiz corresponding
     * to the query.
     *
     * @param query the query of the quiz search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/quizzes")
    @Timed
    public ResponseEntity<List<QuizDTO>> searchQuizzes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Quizzes for query {}", query);
        Page<Quiz> page = quizSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/quizzes");
        return new ResponseEntity<>(quizMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

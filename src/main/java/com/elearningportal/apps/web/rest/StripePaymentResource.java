package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.StripePayment;

import com.elearningportal.apps.repository.StripePaymentRepository;
import com.elearningportal.apps.repository.search.StripePaymentSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.StripePaymentDTO;
import com.elearningportal.apps.service.mapper.StripePaymentMapper;
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
 * REST controller for managing StripePayment.
 */
@RestController
@RequestMapping("/api")
public class StripePaymentResource {

    private final Logger log = LoggerFactory.getLogger(StripePaymentResource.class);

    private static final String ENTITY_NAME = "stripePayment";

    private final StripePaymentRepository stripePaymentRepository;

    private final StripePaymentMapper stripePaymentMapper;

    private final StripePaymentSearchRepository stripePaymentSearchRepository;

    public StripePaymentResource(StripePaymentRepository stripePaymentRepository, StripePaymentMapper stripePaymentMapper, StripePaymentSearchRepository stripePaymentSearchRepository) {
        this.stripePaymentRepository = stripePaymentRepository;
        this.stripePaymentMapper = stripePaymentMapper;
        this.stripePaymentSearchRepository = stripePaymentSearchRepository;
    }

    /**
     * POST  /stripe-payments : Create a new stripePayment.
     *
     * @param stripePaymentDTO the stripePaymentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stripePaymentDTO, or with status 400 (Bad Request) if the stripePayment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stripe-payments")
    @Timed
    public ResponseEntity<StripePaymentDTO> createStripePayment(@Valid @RequestBody StripePaymentDTO stripePaymentDTO) throws URISyntaxException {
        log.debug("REST request to save StripePayment : {}", stripePaymentDTO);
        if (stripePaymentDTO.getId() != null) {
            throw new BadRequestAlertException("A new stripePayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StripePayment stripePayment = stripePaymentMapper.toEntity(stripePaymentDTO);
        stripePayment = stripePaymentRepository.save(stripePayment);
        StripePaymentDTO result = stripePaymentMapper.toDto(stripePayment);
        stripePaymentSearchRepository.save(stripePayment);
        return ResponseEntity.created(new URI("/api/stripe-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stripe-payments : Updates an existing stripePayment.
     *
     * @param stripePaymentDTO the stripePaymentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stripePaymentDTO,
     * or with status 400 (Bad Request) if the stripePaymentDTO is not valid,
     * or with status 500 (Internal Server Error) if the stripePaymentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stripe-payments")
    @Timed
    public ResponseEntity<StripePaymentDTO> updateStripePayment(@Valid @RequestBody StripePaymentDTO stripePaymentDTO) throws URISyntaxException {
        log.debug("REST request to update StripePayment : {}", stripePaymentDTO);
        if (stripePaymentDTO.getId() == null) {
            return createStripePayment(stripePaymentDTO);
        }
        StripePayment stripePayment = stripePaymentMapper.toEntity(stripePaymentDTO);
        stripePayment = stripePaymentRepository.save(stripePayment);
        StripePaymentDTO result = stripePaymentMapper.toDto(stripePayment);
        stripePaymentSearchRepository.save(stripePayment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stripePaymentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stripe-payments : get all the stripePayments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stripePayments in body
     */
    @GetMapping("/stripe-payments")
    @Timed
    public ResponseEntity<List<StripePaymentDTO>> getAllStripePayments(Pageable pageable) {
        log.debug("REST request to get a page of StripePayments");
        Page<StripePayment> page = stripePaymentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stripe-payments");
        return new ResponseEntity<>(stripePaymentMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /stripe-payments/:id : get the "id" stripePayment.
     *
     * @param id the id of the stripePaymentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stripePaymentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stripe-payments/{id}")
    @Timed
    public ResponseEntity<StripePaymentDTO> getStripePayment(@PathVariable Long id) {
        log.debug("REST request to get StripePayment : {}", id);
        StripePayment stripePayment = stripePaymentRepository.findOne(id);
        StripePaymentDTO stripePaymentDTO = stripePaymentMapper.toDto(stripePayment);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stripePaymentDTO));
    }

    /**
     * DELETE  /stripe-payments/:id : delete the "id" stripePayment.
     *
     * @param id the id of the stripePaymentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stripe-payments/{id}")
    @Timed
    public ResponseEntity<Void> deleteStripePayment(@PathVariable Long id) {
        log.debug("REST request to delete StripePayment : {}", id);
        stripePaymentRepository.delete(id);
        stripePaymentSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stripe-payments?query=:query : search for the stripePayment corresponding
     * to the query.
     *
     * @param query the query of the stripePayment search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stripe-payments")
    @Timed
    public ResponseEntity<List<StripePaymentDTO>> searchStripePayments(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of StripePayments for query {}", query);
        Page<StripePayment> page = stripePaymentSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stripe-payments");
        return new ResponseEntity<>(stripePaymentMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

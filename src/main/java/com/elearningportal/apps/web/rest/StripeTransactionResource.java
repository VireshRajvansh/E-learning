package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.StripeTransaction;

import com.elearningportal.apps.repository.StripeTransactionRepository;
import com.elearningportal.apps.repository.search.StripeTransactionSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.StripeTransactionDTO;
import com.elearningportal.apps.service.mapper.StripeTransactionMapper;
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
 * REST controller for managing StripeTransaction.
 */
@RestController
@RequestMapping("/api")
public class StripeTransactionResource {

    private final Logger log = LoggerFactory.getLogger(StripeTransactionResource.class);

    private static final String ENTITY_NAME = "stripeTransaction";

    private final StripeTransactionRepository stripeTransactionRepository;

    private final StripeTransactionMapper stripeTransactionMapper;

    private final StripeTransactionSearchRepository stripeTransactionSearchRepository;

    public StripeTransactionResource(StripeTransactionRepository stripeTransactionRepository, StripeTransactionMapper stripeTransactionMapper, StripeTransactionSearchRepository stripeTransactionSearchRepository) {
        this.stripeTransactionRepository = stripeTransactionRepository;
        this.stripeTransactionMapper = stripeTransactionMapper;
        this.stripeTransactionSearchRepository = stripeTransactionSearchRepository;
    }

    /**
     * POST  /stripe-transactions : Create a new stripeTransaction.
     *
     * @param stripeTransactionDTO the stripeTransactionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stripeTransactionDTO, or with status 400 (Bad Request) if the stripeTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stripe-transactions")
    @Timed
    public ResponseEntity<StripeTransactionDTO> createStripeTransaction(@RequestBody StripeTransactionDTO stripeTransactionDTO) throws URISyntaxException {
        log.debug("REST request to save StripeTransaction : {}", stripeTransactionDTO);
        if (stripeTransactionDTO.getId() != null) {
            throw new BadRequestAlertException("A new stripeTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StripeTransaction stripeTransaction = stripeTransactionMapper.toEntity(stripeTransactionDTO);
        stripeTransaction = stripeTransactionRepository.save(stripeTransaction);
        StripeTransactionDTO result = stripeTransactionMapper.toDto(stripeTransaction);
        stripeTransactionSearchRepository.save(stripeTransaction);
        return ResponseEntity.created(new URI("/api/stripe-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stripe-transactions : Updates an existing stripeTransaction.
     *
     * @param stripeTransactionDTO the stripeTransactionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stripeTransactionDTO,
     * or with status 400 (Bad Request) if the stripeTransactionDTO is not valid,
     * or with status 500 (Internal Server Error) if the stripeTransactionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stripe-transactions")
    @Timed
    public ResponseEntity<StripeTransactionDTO> updateStripeTransaction(@RequestBody StripeTransactionDTO stripeTransactionDTO) throws URISyntaxException {
        log.debug("REST request to update StripeTransaction : {}", stripeTransactionDTO);
        if (stripeTransactionDTO.getId() == null) {
            return createStripeTransaction(stripeTransactionDTO);
        }
        StripeTransaction stripeTransaction = stripeTransactionMapper.toEntity(stripeTransactionDTO);
        stripeTransaction = stripeTransactionRepository.save(stripeTransaction);
        StripeTransactionDTO result = stripeTransactionMapper.toDto(stripeTransaction);
        stripeTransactionSearchRepository.save(stripeTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stripeTransactionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stripe-transactions : get all the stripeTransactions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stripeTransactions in body
     */
    @GetMapping("/stripe-transactions")
    @Timed
    public ResponseEntity<List<StripeTransactionDTO>> getAllStripeTransactions(Pageable pageable) {
        log.debug("REST request to get a page of StripeTransactions");
        Page<StripeTransaction> page = stripeTransactionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stripe-transactions");
        return new ResponseEntity<>(stripeTransactionMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /stripe-transactions/:id : get the "id" stripeTransaction.
     *
     * @param id the id of the stripeTransactionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stripeTransactionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stripe-transactions/{id}")
    @Timed
    public ResponseEntity<StripeTransactionDTO> getStripeTransaction(@PathVariable Long id) {
        log.debug("REST request to get StripeTransaction : {}", id);
        StripeTransaction stripeTransaction = stripeTransactionRepository.findOne(id);
        StripeTransactionDTO stripeTransactionDTO = stripeTransactionMapper.toDto(stripeTransaction);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stripeTransactionDTO));
    }

    /**
     * DELETE  /stripe-transactions/:id : delete the "id" stripeTransaction.
     *
     * @param id the id of the stripeTransactionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stripe-transactions/{id}")
    @Timed
    public ResponseEntity<Void> deleteStripeTransaction(@PathVariable Long id) {
        log.debug("REST request to delete StripeTransaction : {}", id);
        stripeTransactionRepository.delete(id);
        stripeTransactionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stripe-transactions?query=:query : search for the stripeTransaction corresponding
     * to the query.
     *
     * @param query the query of the stripeTransaction search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stripe-transactions")
    @Timed
    public ResponseEntity<List<StripeTransactionDTO>> searchStripeTransactions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of StripeTransactions for query {}", query);
        Page<StripeTransaction> page = stripeTransactionSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stripe-transactions");
        return new ResponseEntity<>(stripeTransactionMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

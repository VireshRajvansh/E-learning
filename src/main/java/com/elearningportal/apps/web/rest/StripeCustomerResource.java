package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.StripeCustomer;

import com.elearningportal.apps.repository.StripeCustomerRepository;
import com.elearningportal.apps.repository.search.StripeCustomerSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.StripeCustomerDTO;
import com.elearningportal.apps.service.mapper.StripeCustomerMapper;
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
 * REST controller for managing StripeCustomer.
 */
@RestController
@RequestMapping("/api")
public class StripeCustomerResource {

    private final Logger log = LoggerFactory.getLogger(StripeCustomerResource.class);

    private static final String ENTITY_NAME = "stripeCustomer";

    private final StripeCustomerRepository stripeCustomerRepository;

    private final StripeCustomerMapper stripeCustomerMapper;

    private final StripeCustomerSearchRepository stripeCustomerSearchRepository;

    public StripeCustomerResource(StripeCustomerRepository stripeCustomerRepository, StripeCustomerMapper stripeCustomerMapper, StripeCustomerSearchRepository stripeCustomerSearchRepository) {
        this.stripeCustomerRepository = stripeCustomerRepository;
        this.stripeCustomerMapper = stripeCustomerMapper;
        this.stripeCustomerSearchRepository = stripeCustomerSearchRepository;
    }

    /**
     * POST  /stripe-customers : Create a new stripeCustomer.
     *
     * @param stripeCustomerDTO the stripeCustomerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stripeCustomerDTO, or with status 400 (Bad Request) if the stripeCustomer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stripe-customers")
    @Timed
    public ResponseEntity<StripeCustomerDTO> createStripeCustomer(@Valid @RequestBody StripeCustomerDTO stripeCustomerDTO) throws URISyntaxException {
        log.debug("REST request to save StripeCustomer : {}", stripeCustomerDTO);
        if (stripeCustomerDTO.getId() != null) {
            throw new BadRequestAlertException("A new stripeCustomer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StripeCustomer stripeCustomer = stripeCustomerMapper.toEntity(stripeCustomerDTO);
        stripeCustomer = stripeCustomerRepository.save(stripeCustomer);
        StripeCustomerDTO result = stripeCustomerMapper.toDto(stripeCustomer);
        stripeCustomerSearchRepository.save(stripeCustomer);
        return ResponseEntity.created(new URI("/api/stripe-customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stripe-customers : Updates an existing stripeCustomer.
     *
     * @param stripeCustomerDTO the stripeCustomerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stripeCustomerDTO,
     * or with status 400 (Bad Request) if the stripeCustomerDTO is not valid,
     * or with status 500 (Internal Server Error) if the stripeCustomerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stripe-customers")
    @Timed
    public ResponseEntity<StripeCustomerDTO> updateStripeCustomer(@Valid @RequestBody StripeCustomerDTO stripeCustomerDTO) throws URISyntaxException {
        log.debug("REST request to update StripeCustomer : {}", stripeCustomerDTO);
        if (stripeCustomerDTO.getId() == null) {
            return createStripeCustomer(stripeCustomerDTO);
        }
        StripeCustomer stripeCustomer = stripeCustomerMapper.toEntity(stripeCustomerDTO);
        stripeCustomer = stripeCustomerRepository.save(stripeCustomer);
        StripeCustomerDTO result = stripeCustomerMapper.toDto(stripeCustomer);
        stripeCustomerSearchRepository.save(stripeCustomer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stripeCustomerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stripe-customers : get all the stripeCustomers.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of stripeCustomers in body
     */
    @GetMapping("/stripe-customers")
    @Timed
    public ResponseEntity<List<StripeCustomerDTO>> getAllStripeCustomers(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("student-is-null".equals(filter)) {
            log.debug("REST request to get all StripeCustomers where student is null");
            return new ResponseEntity<>(StreamSupport
                .stream(stripeCustomerRepository.findAll().spliterator(), false)
                .filter(stripeCustomer -> stripeCustomer.getStudent() == null)
                .map(stripeCustomerMapper::toDto)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        if ("teacher-is-null".equals(filter)) {
            log.debug("REST request to get all StripeCustomers where teacher is null");
            return new ResponseEntity<>(StreamSupport
                .stream(stripeCustomerRepository.findAll().spliterator(), false)
                .filter(stripeCustomer -> stripeCustomer.getTeacher() == null)
                .map(stripeCustomerMapper::toDto)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of StripeCustomers");
        Page<StripeCustomer> page = stripeCustomerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stripe-customers");
        return new ResponseEntity<>(stripeCustomerMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /stripe-customers/:id : get the "id" stripeCustomer.
     *
     * @param id the id of the stripeCustomerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stripeCustomerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stripe-customers/{id}")
    @Timed
    public ResponseEntity<StripeCustomerDTO> getStripeCustomer(@PathVariable Long id) {
        log.debug("REST request to get StripeCustomer : {}", id);
        StripeCustomer stripeCustomer = stripeCustomerRepository.findOne(id);
        StripeCustomerDTO stripeCustomerDTO = stripeCustomerMapper.toDto(stripeCustomer);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stripeCustomerDTO));
    }

    /**
     * DELETE  /stripe-customers/:id : delete the "id" stripeCustomer.
     *
     * @param id the id of the stripeCustomerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stripe-customers/{id}")
    @Timed
    public ResponseEntity<Void> deleteStripeCustomer(@PathVariable Long id) {
        log.debug("REST request to delete StripeCustomer : {}", id);
        stripeCustomerRepository.delete(id);
        stripeCustomerSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stripe-customers?query=:query : search for the stripeCustomer corresponding
     * to the query.
     *
     * @param query the query of the stripeCustomer search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stripe-customers")
    @Timed
    public ResponseEntity<List<StripeCustomerDTO>> searchStripeCustomers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of StripeCustomers for query {}", query);
        Page<StripeCustomer> page = stripeCustomerSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stripe-customers");
        return new ResponseEntity<>(stripeCustomerMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

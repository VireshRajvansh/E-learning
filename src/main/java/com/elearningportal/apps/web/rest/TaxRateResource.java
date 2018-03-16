package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.TaxRate;

import com.elearningportal.apps.repository.TaxRateRepository;
import com.elearningportal.apps.repository.search.TaxRateSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.TaxRateDTO;
import com.elearningportal.apps.service.mapper.TaxRateMapper;
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
 * REST controller for managing TaxRate.
 */
@RestController
@RequestMapping("/api")
public class TaxRateResource {

    private final Logger log = LoggerFactory.getLogger(TaxRateResource.class);

    private static final String ENTITY_NAME = "taxRate";

    private final TaxRateRepository taxRateRepository;

    private final TaxRateMapper taxRateMapper;

    private final TaxRateSearchRepository taxRateSearchRepository;

    public TaxRateResource(TaxRateRepository taxRateRepository, TaxRateMapper taxRateMapper, TaxRateSearchRepository taxRateSearchRepository) {
        this.taxRateRepository = taxRateRepository;
        this.taxRateMapper = taxRateMapper;
        this.taxRateSearchRepository = taxRateSearchRepository;
    }

    /**
     * POST  /tax-rates : Create a new taxRate.
     *
     * @param taxRateDTO the taxRateDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taxRateDTO, or with status 400 (Bad Request) if the taxRate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tax-rates")
    @Timed
    public ResponseEntity<TaxRateDTO> createTaxRate(@RequestBody TaxRateDTO taxRateDTO) throws URISyntaxException {
        log.debug("REST request to save TaxRate : {}", taxRateDTO);
        if (taxRateDTO.getId() != null) {
            throw new BadRequestAlertException("A new taxRate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaxRate taxRate = taxRateMapper.toEntity(taxRateDTO);
        taxRate = taxRateRepository.save(taxRate);
        TaxRateDTO result = taxRateMapper.toDto(taxRate);
        taxRateSearchRepository.save(taxRate);
        return ResponseEntity.created(new URI("/api/tax-rates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tax-rates : Updates an existing taxRate.
     *
     * @param taxRateDTO the taxRateDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taxRateDTO,
     * or with status 400 (Bad Request) if the taxRateDTO is not valid,
     * or with status 500 (Internal Server Error) if the taxRateDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tax-rates")
    @Timed
    public ResponseEntity<TaxRateDTO> updateTaxRate(@RequestBody TaxRateDTO taxRateDTO) throws URISyntaxException {
        log.debug("REST request to update TaxRate : {}", taxRateDTO);
        if (taxRateDTO.getId() == null) {
            return createTaxRate(taxRateDTO);
        }
        TaxRate taxRate = taxRateMapper.toEntity(taxRateDTO);
        taxRate = taxRateRepository.save(taxRate);
        TaxRateDTO result = taxRateMapper.toDto(taxRate);
        taxRateSearchRepository.save(taxRate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taxRateDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tax-rates : get all the taxRates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of taxRates in body
     */
    @GetMapping("/tax-rates")
    @Timed
    public ResponseEntity<List<TaxRateDTO>> getAllTaxRates(Pageable pageable) {
        log.debug("REST request to get a page of TaxRates");
        Page<TaxRate> page = taxRateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tax-rates");
        return new ResponseEntity<>(taxRateMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /tax-rates/:id : get the "id" taxRate.
     *
     * @param id the id of the taxRateDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taxRateDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tax-rates/{id}")
    @Timed
    public ResponseEntity<TaxRateDTO> getTaxRate(@PathVariable Long id) {
        log.debug("REST request to get TaxRate : {}", id);
        TaxRate taxRate = taxRateRepository.findOne(id);
        TaxRateDTO taxRateDTO = taxRateMapper.toDto(taxRate);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(taxRateDTO));
    }

    /**
     * DELETE  /tax-rates/:id : delete the "id" taxRate.
     *
     * @param id the id of the taxRateDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tax-rates/{id}")
    @Timed
    public ResponseEntity<Void> deleteTaxRate(@PathVariable Long id) {
        log.debug("REST request to delete TaxRate : {}", id);
        taxRateRepository.delete(id);
        taxRateSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tax-rates?query=:query : search for the taxRate corresponding
     * to the query.
     *
     * @param query the query of the taxRate search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/tax-rates")
    @Timed
    public ResponseEntity<List<TaxRateDTO>> searchTaxRates(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TaxRates for query {}", query);
        Page<TaxRate> page = taxRateSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/tax-rates");
        return new ResponseEntity<>(taxRateMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

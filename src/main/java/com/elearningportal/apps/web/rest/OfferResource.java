package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.Offer;

import com.elearningportal.apps.repository.OfferRepository;
import com.elearningportal.apps.repository.search.OfferSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.OfferDTO;
import com.elearningportal.apps.service.mapper.OfferMapper;
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
 * REST controller for managing Offer.
 */
@RestController
@RequestMapping("/api")
public class OfferResource {

    private final Logger log = LoggerFactory.getLogger(OfferResource.class);

    private static final String ENTITY_NAME = "offer";

    private final OfferRepository offerRepository;

    private final OfferMapper offerMapper;

    private final OfferSearchRepository offerSearchRepository;

    public OfferResource(OfferRepository offerRepository, OfferMapper offerMapper, OfferSearchRepository offerSearchRepository) {
        this.offerRepository = offerRepository;
        this.offerMapper = offerMapper;
        this.offerSearchRepository = offerSearchRepository;
    }

    /**
     * POST  /offers : Create a new offer.
     *
     * @param offerDTO the offerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offerDTO, or with status 400 (Bad Request) if the offer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offers")
    @Timed
    public ResponseEntity<OfferDTO> createOffer(@Valid @RequestBody OfferDTO offerDTO) throws URISyntaxException {
        log.debug("REST request to save Offer : {}", offerDTO);
        if (offerDTO.getId() != null) {
            throw new BadRequestAlertException("A new offer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Offer offer = offerMapper.toEntity(offerDTO);
        offer = offerRepository.save(offer);
        OfferDTO result = offerMapper.toDto(offer);
        offerSearchRepository.save(offer);
        return ResponseEntity.created(new URI("/api/offers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /offers : Updates an existing offer.
     *
     * @param offerDTO the offerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offerDTO,
     * or with status 400 (Bad Request) if the offerDTO is not valid,
     * or with status 500 (Internal Server Error) if the offerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offers")
    @Timed
    public ResponseEntity<OfferDTO> updateOffer(@Valid @RequestBody OfferDTO offerDTO) throws URISyntaxException {
        log.debug("REST request to update Offer : {}", offerDTO);
        if (offerDTO.getId() == null) {
            return createOffer(offerDTO);
        }
        Offer offer = offerMapper.toEntity(offerDTO);
        offer = offerRepository.save(offer);
        OfferDTO result = offerMapper.toDto(offer);
        offerSearchRepository.save(offer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /offers : get all the offers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers")
    @Timed
    public ResponseEntity<List<OfferDTO>> getAllOffers(Pageable pageable) {
        log.debug("REST request to get a page of Offers");
        Page<Offer> page = offerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/offers");
        return new ResponseEntity<>(offerMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /offers/:id : get the "id" offer.
     *
     * @param id the id of the offerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/offers/{id}")
    @Timed
    public ResponseEntity<OfferDTO> getOffer(@PathVariable Long id) {
        log.debug("REST request to get Offer : {}", id);
        Offer offer = offerRepository.findOne(id);
        OfferDTO offerDTO = offerMapper.toDto(offer);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offerDTO));
    }

    /**
     * DELETE  /offers/:id : delete the "id" offer.
     *
     * @param id the id of the offerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        log.debug("REST request to delete Offer : {}", id);
        offerRepository.delete(id);
        offerSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/offers?query=:query : search for the offer corresponding
     * to the query.
     *
     * @param query the query of the offer search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/offers")
    @Timed
    public ResponseEntity<List<OfferDTO>> searchOffers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Offers for query {}", query);
        Page<Offer> page = offerSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/offers");
        return new ResponseEntity<>(offerMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

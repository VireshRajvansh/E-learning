package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.CardExpiryReminder;

import com.elearningportal.apps.repository.CardExpiryReminderRepository;
import com.elearningportal.apps.repository.search.CardExpiryReminderSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.CardExpiryReminderDTO;
import com.elearningportal.apps.service.mapper.CardExpiryReminderMapper;
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
 * REST controller for managing CardExpiryReminder.
 */
@RestController
@RequestMapping("/api")
public class CardExpiryReminderResource {

    private final Logger log = LoggerFactory.getLogger(CardExpiryReminderResource.class);

    private static final String ENTITY_NAME = "cardExpiryReminder";

    private final CardExpiryReminderRepository cardExpiryReminderRepository;

    private final CardExpiryReminderMapper cardExpiryReminderMapper;

    private final CardExpiryReminderSearchRepository cardExpiryReminderSearchRepository;

    public CardExpiryReminderResource(CardExpiryReminderRepository cardExpiryReminderRepository, CardExpiryReminderMapper cardExpiryReminderMapper, CardExpiryReminderSearchRepository cardExpiryReminderSearchRepository) {
        this.cardExpiryReminderRepository = cardExpiryReminderRepository;
        this.cardExpiryReminderMapper = cardExpiryReminderMapper;
        this.cardExpiryReminderSearchRepository = cardExpiryReminderSearchRepository;
    }

    /**
     * POST  /card-expiry-reminders : Create a new cardExpiryReminder.
     *
     * @param cardExpiryReminderDTO the cardExpiryReminderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardExpiryReminderDTO, or with status 400 (Bad Request) if the cardExpiryReminder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/card-expiry-reminders")
    @Timed
    public ResponseEntity<CardExpiryReminderDTO> createCardExpiryReminder(@RequestBody CardExpiryReminderDTO cardExpiryReminderDTO) throws URISyntaxException {
        log.debug("REST request to save CardExpiryReminder : {}", cardExpiryReminderDTO);
        if (cardExpiryReminderDTO.getId() != null) {
            throw new BadRequestAlertException("A new cardExpiryReminder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardExpiryReminder cardExpiryReminder = cardExpiryReminderMapper.toEntity(cardExpiryReminderDTO);
        cardExpiryReminder = cardExpiryReminderRepository.save(cardExpiryReminder);
        CardExpiryReminderDTO result = cardExpiryReminderMapper.toDto(cardExpiryReminder);
        cardExpiryReminderSearchRepository.save(cardExpiryReminder);
        return ResponseEntity.created(new URI("/api/card-expiry-reminders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /card-expiry-reminders : Updates an existing cardExpiryReminder.
     *
     * @param cardExpiryReminderDTO the cardExpiryReminderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardExpiryReminderDTO,
     * or with status 400 (Bad Request) if the cardExpiryReminderDTO is not valid,
     * or with status 500 (Internal Server Error) if the cardExpiryReminderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/card-expiry-reminders")
    @Timed
    public ResponseEntity<CardExpiryReminderDTO> updateCardExpiryReminder(@RequestBody CardExpiryReminderDTO cardExpiryReminderDTO) throws URISyntaxException {
        log.debug("REST request to update CardExpiryReminder : {}", cardExpiryReminderDTO);
        if (cardExpiryReminderDTO.getId() == null) {
            return createCardExpiryReminder(cardExpiryReminderDTO);
        }
        CardExpiryReminder cardExpiryReminder = cardExpiryReminderMapper.toEntity(cardExpiryReminderDTO);
        cardExpiryReminder = cardExpiryReminderRepository.save(cardExpiryReminder);
        CardExpiryReminderDTO result = cardExpiryReminderMapper.toDto(cardExpiryReminder);
        cardExpiryReminderSearchRepository.save(cardExpiryReminder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardExpiryReminderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /card-expiry-reminders : get all the cardExpiryReminders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cardExpiryReminders in body
     */
    @GetMapping("/card-expiry-reminders")
    @Timed
    public ResponseEntity<List<CardExpiryReminderDTO>> getAllCardExpiryReminders(Pageable pageable) {
        log.debug("REST request to get a page of CardExpiryReminders");
        Page<CardExpiryReminder> page = cardExpiryReminderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/card-expiry-reminders");
        return new ResponseEntity<>(cardExpiryReminderMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /card-expiry-reminders/:id : get the "id" cardExpiryReminder.
     *
     * @param id the id of the cardExpiryReminderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardExpiryReminderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/card-expiry-reminders/{id}")
    @Timed
    public ResponseEntity<CardExpiryReminderDTO> getCardExpiryReminder(@PathVariable Long id) {
        log.debug("REST request to get CardExpiryReminder : {}", id);
        CardExpiryReminder cardExpiryReminder = cardExpiryReminderRepository.findOne(id);
        CardExpiryReminderDTO cardExpiryReminderDTO = cardExpiryReminderMapper.toDto(cardExpiryReminder);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cardExpiryReminderDTO));
    }

    /**
     * DELETE  /card-expiry-reminders/:id : delete the "id" cardExpiryReminder.
     *
     * @param id the id of the cardExpiryReminderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/card-expiry-reminders/{id}")
    @Timed
    public ResponseEntity<Void> deleteCardExpiryReminder(@PathVariable Long id) {
        log.debug("REST request to delete CardExpiryReminder : {}", id);
        cardExpiryReminderRepository.delete(id);
        cardExpiryReminderSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/card-expiry-reminders?query=:query : search for the cardExpiryReminder corresponding
     * to the query.
     *
     * @param query the query of the cardExpiryReminder search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/card-expiry-reminders")
    @Timed
    public ResponseEntity<List<CardExpiryReminderDTO>> searchCardExpiryReminders(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of CardExpiryReminders for query {}", query);
        Page<CardExpiryReminder> page = cardExpiryReminderSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/card-expiry-reminders");
        return new ResponseEntity<>(cardExpiryReminderMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

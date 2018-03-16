package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.UserSignUpByReferralCode;

import com.elearningportal.apps.repository.UserSignUpByReferralCodeRepository;
import com.elearningportal.apps.repository.search.UserSignUpByReferralCodeSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.UserSignUpByReferralCodeDTO;
import com.elearningportal.apps.service.mapper.UserSignUpByReferralCodeMapper;
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
 * REST controller for managing UserSignUpByReferralCode.
 */
@RestController
@RequestMapping("/api")
public class UserSignUpByReferralCodeResource {

    private final Logger log = LoggerFactory.getLogger(UserSignUpByReferralCodeResource.class);

    private static final String ENTITY_NAME = "userSignUpByReferralCode";

    private final UserSignUpByReferralCodeRepository userSignUpByReferralCodeRepository;

    private final UserSignUpByReferralCodeMapper userSignUpByReferralCodeMapper;

    private final UserSignUpByReferralCodeSearchRepository userSignUpByReferralCodeSearchRepository;

    public UserSignUpByReferralCodeResource(UserSignUpByReferralCodeRepository userSignUpByReferralCodeRepository, UserSignUpByReferralCodeMapper userSignUpByReferralCodeMapper, UserSignUpByReferralCodeSearchRepository userSignUpByReferralCodeSearchRepository) {
        this.userSignUpByReferralCodeRepository = userSignUpByReferralCodeRepository;
        this.userSignUpByReferralCodeMapper = userSignUpByReferralCodeMapper;
        this.userSignUpByReferralCodeSearchRepository = userSignUpByReferralCodeSearchRepository;
    }

    /**
     * POST  /user-sign-up-by-referral-codes : Create a new userSignUpByReferralCode.
     *
     * @param userSignUpByReferralCodeDTO the userSignUpByReferralCodeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userSignUpByReferralCodeDTO, or with status 400 (Bad Request) if the userSignUpByReferralCode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-sign-up-by-referral-codes")
    @Timed
    public ResponseEntity<UserSignUpByReferralCodeDTO> createUserSignUpByReferralCode(@RequestBody UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO) throws URISyntaxException {
        log.debug("REST request to save UserSignUpByReferralCode : {}", userSignUpByReferralCodeDTO);
        if (userSignUpByReferralCodeDTO.getId() != null) {
            throw new BadRequestAlertException("A new userSignUpByReferralCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserSignUpByReferralCode userSignUpByReferralCode = userSignUpByReferralCodeMapper.toEntity(userSignUpByReferralCodeDTO);
        userSignUpByReferralCode = userSignUpByReferralCodeRepository.save(userSignUpByReferralCode);
        UserSignUpByReferralCodeDTO result = userSignUpByReferralCodeMapper.toDto(userSignUpByReferralCode);
        userSignUpByReferralCodeSearchRepository.save(userSignUpByReferralCode);
        return ResponseEntity.created(new URI("/api/user-sign-up-by-referral-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-sign-up-by-referral-codes : Updates an existing userSignUpByReferralCode.
     *
     * @param userSignUpByReferralCodeDTO the userSignUpByReferralCodeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userSignUpByReferralCodeDTO,
     * or with status 400 (Bad Request) if the userSignUpByReferralCodeDTO is not valid,
     * or with status 500 (Internal Server Error) if the userSignUpByReferralCodeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-sign-up-by-referral-codes")
    @Timed
    public ResponseEntity<UserSignUpByReferralCodeDTO> updateUserSignUpByReferralCode(@RequestBody UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO) throws URISyntaxException {
        log.debug("REST request to update UserSignUpByReferralCode : {}", userSignUpByReferralCodeDTO);
        if (userSignUpByReferralCodeDTO.getId() == null) {
            return createUserSignUpByReferralCode(userSignUpByReferralCodeDTO);
        }
        UserSignUpByReferralCode userSignUpByReferralCode = userSignUpByReferralCodeMapper.toEntity(userSignUpByReferralCodeDTO);
        userSignUpByReferralCode = userSignUpByReferralCodeRepository.save(userSignUpByReferralCode);
        UserSignUpByReferralCodeDTO result = userSignUpByReferralCodeMapper.toDto(userSignUpByReferralCode);
        userSignUpByReferralCodeSearchRepository.save(userSignUpByReferralCode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userSignUpByReferralCodeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-sign-up-by-referral-codes : get all the userSignUpByReferralCodes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userSignUpByReferralCodes in body
     */
    @GetMapping("/user-sign-up-by-referral-codes")
    @Timed
    public ResponseEntity<List<UserSignUpByReferralCodeDTO>> getAllUserSignUpByReferralCodes(Pageable pageable) {
        log.debug("REST request to get a page of UserSignUpByReferralCodes");
        Page<UserSignUpByReferralCode> page = userSignUpByReferralCodeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-sign-up-by-referral-codes");
        return new ResponseEntity<>(userSignUpByReferralCodeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-sign-up-by-referral-codes/:id : get the "id" userSignUpByReferralCode.
     *
     * @param id the id of the userSignUpByReferralCodeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userSignUpByReferralCodeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-sign-up-by-referral-codes/{id}")
    @Timed
    public ResponseEntity<UserSignUpByReferralCodeDTO> getUserSignUpByReferralCode(@PathVariable Long id) {
        log.debug("REST request to get UserSignUpByReferralCode : {}", id);
        UserSignUpByReferralCode userSignUpByReferralCode = userSignUpByReferralCodeRepository.findOne(id);
        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO = userSignUpByReferralCodeMapper.toDto(userSignUpByReferralCode);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userSignUpByReferralCodeDTO));
    }

    /**
     * DELETE  /user-sign-up-by-referral-codes/:id : delete the "id" userSignUpByReferralCode.
     *
     * @param id the id of the userSignUpByReferralCodeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-sign-up-by-referral-codes/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserSignUpByReferralCode(@PathVariable Long id) {
        log.debug("REST request to delete UserSignUpByReferralCode : {}", id);
        userSignUpByReferralCodeRepository.delete(id);
        userSignUpByReferralCodeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/user-sign-up-by-referral-codes?query=:query : search for the userSignUpByReferralCode corresponding
     * to the query.
     *
     * @param query the query of the userSignUpByReferralCode search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/user-sign-up-by-referral-codes")
    @Timed
    public ResponseEntity<List<UserSignUpByReferralCodeDTO>> searchUserSignUpByReferralCodes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of UserSignUpByReferralCodes for query {}", query);
        Page<UserSignUpByReferralCode> page = userSignUpByReferralCodeSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/user-sign-up-by-referral-codes");
        return new ResponseEntity<>(userSignUpByReferralCodeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

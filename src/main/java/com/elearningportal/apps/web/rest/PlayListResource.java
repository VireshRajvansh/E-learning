package com.elearningportal.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearningportal.apps.domain.PlayList;

import com.elearningportal.apps.repository.PlayListRepository;
import com.elearningportal.apps.repository.search.PlayListSearchRepository;
import com.elearningportal.apps.web.rest.errors.BadRequestAlertException;
import com.elearningportal.apps.web.rest.util.HeaderUtil;
import com.elearningportal.apps.web.rest.util.PaginationUtil;
import com.elearningportal.apps.service.dto.PlayListDTO;
import com.elearningportal.apps.service.mapper.PlayListMapper;
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
 * REST controller for managing PlayList.
 */
@RestController
@RequestMapping("/api")
public class PlayListResource {

    private final Logger log = LoggerFactory.getLogger(PlayListResource.class);

    private static final String ENTITY_NAME = "playList";

    private final PlayListRepository playListRepository;

    private final PlayListMapper playListMapper;

    private final PlayListSearchRepository playListSearchRepository;

    public PlayListResource(PlayListRepository playListRepository, PlayListMapper playListMapper, PlayListSearchRepository playListSearchRepository) {
        this.playListRepository = playListRepository;
        this.playListMapper = playListMapper;
        this.playListSearchRepository = playListSearchRepository;
    }

    /**
     * POST  /play-lists : Create a new playList.
     *
     * @param playListDTO the playListDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new playListDTO, or with status 400 (Bad Request) if the playList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/play-lists")
    @Timed
    public ResponseEntity<PlayListDTO> createPlayList(@Valid @RequestBody PlayListDTO playListDTO) throws URISyntaxException {
        log.debug("REST request to save PlayList : {}", playListDTO);
        if (playListDTO.getId() != null) {
            throw new BadRequestAlertException("A new playList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlayList playList = playListMapper.toEntity(playListDTO);
        playList = playListRepository.save(playList);
        PlayListDTO result = playListMapper.toDto(playList);
        playListSearchRepository.save(playList);
        return ResponseEntity.created(new URI("/api/play-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /play-lists : Updates an existing playList.
     *
     * @param playListDTO the playListDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated playListDTO,
     * or with status 400 (Bad Request) if the playListDTO is not valid,
     * or with status 500 (Internal Server Error) if the playListDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/play-lists")
    @Timed
    public ResponseEntity<PlayListDTO> updatePlayList(@Valid @RequestBody PlayListDTO playListDTO) throws URISyntaxException {
        log.debug("REST request to update PlayList : {}", playListDTO);
        if (playListDTO.getId() == null) {
            return createPlayList(playListDTO);
        }
        PlayList playList = playListMapper.toEntity(playListDTO);
        playList = playListRepository.save(playList);
        PlayListDTO result = playListMapper.toDto(playList);
        playListSearchRepository.save(playList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, playListDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /play-lists : get all the playLists.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of playLists in body
     */
    @GetMapping("/play-lists")
    @Timed
    public ResponseEntity<List<PlayListDTO>> getAllPlayLists(Pageable pageable) {
        log.debug("REST request to get a page of PlayLists");
        Page<PlayList> page = playListRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/play-lists");
        return new ResponseEntity<>(playListMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /play-lists/:id : get the "id" playList.
     *
     * @param id the id of the playListDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the playListDTO, or with status 404 (Not Found)
     */
    @GetMapping("/play-lists/{id}")
    @Timed
    public ResponseEntity<PlayListDTO> getPlayList(@PathVariable Long id) {
        log.debug("REST request to get PlayList : {}", id);
        PlayList playList = playListRepository.findOne(id);
        PlayListDTO playListDTO = playListMapper.toDto(playList);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(playListDTO));
    }

    /**
     * DELETE  /play-lists/:id : delete the "id" playList.
     *
     * @param id the id of the playListDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/play-lists/{id}")
    @Timed
    public ResponseEntity<Void> deletePlayList(@PathVariable Long id) {
        log.debug("REST request to delete PlayList : {}", id);
        playListRepository.delete(id);
        playListSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/play-lists?query=:query : search for the playList corresponding
     * to the query.
     *
     * @param query the query of the playList search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/play-lists")
    @Timed
    public ResponseEntity<List<PlayListDTO>> searchPlayLists(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of PlayLists for query {}", query);
        Page<PlayList> page = playListSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/play-lists");
        return new ResponseEntity<>(playListMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

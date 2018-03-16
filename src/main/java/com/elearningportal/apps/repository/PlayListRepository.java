package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.PlayList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PlayList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayListRepository extends JpaRepository<PlayList, Long> {

}

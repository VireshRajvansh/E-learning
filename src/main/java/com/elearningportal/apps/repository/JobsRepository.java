package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.Jobs;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Jobs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobsRepository extends JpaRepository<Jobs, Long> {

}

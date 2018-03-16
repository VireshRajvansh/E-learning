package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.Services;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Services entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServicesRepository extends JpaRepository<Services, Long> {

}

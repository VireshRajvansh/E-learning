package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.TaxRate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TaxRate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaxRateRepository extends JpaRepository<TaxRate, Long> {

}

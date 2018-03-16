package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.StripeTransaction;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StripeTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StripeTransactionRepository extends JpaRepository<StripeTransaction, Long> {

}

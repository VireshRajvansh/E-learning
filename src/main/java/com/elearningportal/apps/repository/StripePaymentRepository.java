package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.StripePayment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StripePayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StripePaymentRepository extends JpaRepository<StripePayment, Long> {

}

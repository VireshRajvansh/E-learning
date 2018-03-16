package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.StripeCustomer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StripeCustomer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StripeCustomerRepository extends JpaRepository<StripeCustomer, Long> {

}

package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.CardExpiryReminder;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CardExpiryReminder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardExpiryReminderRepository extends JpaRepository<CardExpiryReminder, Long> {

}

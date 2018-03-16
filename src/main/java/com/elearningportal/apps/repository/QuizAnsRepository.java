package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.QuizAns;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the QuizAns entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizAnsRepository extends JpaRepository<QuizAns, Long> {

}

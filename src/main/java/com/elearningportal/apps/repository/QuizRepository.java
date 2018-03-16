package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.Quiz;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Quiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("select quiz from Quiz quiz where quiz.user.login = ?#{principal.username}")
    List<Quiz> findByUserIsCurrentUser();

}

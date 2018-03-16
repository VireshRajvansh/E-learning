package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.Student;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("select student from Student student where student.user.login = ?#{principal.username}")
    List<Student> findByUserIsCurrentUser();

}

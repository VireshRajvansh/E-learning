package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.Teacher;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Teacher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("select teacher from Teacher teacher where teacher.user.login = ?#{principal.username}")
    List<Teacher> findByUserIsCurrentUser();

}

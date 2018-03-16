package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.EducationCollege;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EducationCollege entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EducationCollegeRepository extends JpaRepository<EducationCollege, Long> {

}

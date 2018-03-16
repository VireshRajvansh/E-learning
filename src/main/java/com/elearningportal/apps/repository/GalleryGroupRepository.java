package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.GalleryGroup;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GalleryGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GalleryGroupRepository extends JpaRepository<GalleryGroup, Long> {

}

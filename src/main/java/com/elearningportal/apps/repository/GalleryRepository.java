package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.Gallery;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Gallery entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

}

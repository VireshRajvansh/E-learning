package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.Gallery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Gallery entity.
 */
public interface GallerySearchRepository extends ElasticsearchRepository<Gallery, Long> {
}

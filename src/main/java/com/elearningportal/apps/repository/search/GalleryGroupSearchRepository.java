package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.GalleryGroup;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GalleryGroup entity.
 */
public interface GalleryGroupSearchRepository extends ElasticsearchRepository<GalleryGroup, Long> {
}

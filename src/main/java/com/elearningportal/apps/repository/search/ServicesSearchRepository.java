package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.Services;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Services entity.
 */
public interface ServicesSearchRepository extends ElasticsearchRepository<Services, Long> {
}

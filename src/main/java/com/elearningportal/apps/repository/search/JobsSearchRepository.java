package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.Jobs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Jobs entity.
 */
public interface JobsSearchRepository extends ElasticsearchRepository<Jobs, Long> {
}

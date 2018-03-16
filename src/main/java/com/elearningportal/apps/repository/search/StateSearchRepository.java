package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.State;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the State entity.
 */
public interface StateSearchRepository extends ElasticsearchRepository<State, Long> {
}

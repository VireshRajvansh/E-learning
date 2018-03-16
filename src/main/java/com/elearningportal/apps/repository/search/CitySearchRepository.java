package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.City;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the City entity.
 */
public interface CitySearchRepository extends ElasticsearchRepository<City, Long> {
}

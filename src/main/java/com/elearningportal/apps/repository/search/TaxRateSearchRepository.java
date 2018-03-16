package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.TaxRate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TaxRate entity.
 */
public interface TaxRateSearchRepository extends ElasticsearchRepository<TaxRate, Long> {
}

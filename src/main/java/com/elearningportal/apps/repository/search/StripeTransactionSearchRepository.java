package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.StripeTransaction;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StripeTransaction entity.
 */
public interface StripeTransactionSearchRepository extends ElasticsearchRepository<StripeTransaction, Long> {
}

package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.StripePayment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StripePayment entity.
 */
public interface StripePaymentSearchRepository extends ElasticsearchRepository<StripePayment, Long> {
}

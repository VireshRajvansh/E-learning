package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.StripeCustomer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StripeCustomer entity.
 */
public interface StripeCustomerSearchRepository extends ElasticsearchRepository<StripeCustomer, Long> {
}

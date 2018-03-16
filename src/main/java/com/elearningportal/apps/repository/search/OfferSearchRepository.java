package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.Offer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Offer entity.
 */
public interface OfferSearchRepository extends ElasticsearchRepository<Offer, Long> {
}

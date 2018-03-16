package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.UserSignUpByReferralCode;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserSignUpByReferralCode entity.
 */
public interface UserSignUpByReferralCodeSearchRepository extends ElasticsearchRepository<UserSignUpByReferralCode, Long> {
}

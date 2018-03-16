package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.QuizAns;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the QuizAns entity.
 */
public interface QuizAnsSearchRepository extends ElasticsearchRepository<QuizAns, Long> {
}

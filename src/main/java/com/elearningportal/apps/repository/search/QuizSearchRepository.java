package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.Quiz;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Quiz entity.
 */
public interface QuizSearchRepository extends ElasticsearchRepository<Quiz, Long> {
}

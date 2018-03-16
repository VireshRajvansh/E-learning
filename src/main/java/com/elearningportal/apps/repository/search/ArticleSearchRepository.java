package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.Article;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Article entity.
 */
public interface ArticleSearchRepository extends ElasticsearchRepository<Article, Long> {
}

package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.PlayList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PlayList entity.
 */
public interface PlayListSearchRepository extends ElasticsearchRepository<PlayList, Long> {
}

package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.Teacher;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Teacher entity.
 */
public interface TeacherSearchRepository extends ElasticsearchRepository<Teacher, Long> {
}

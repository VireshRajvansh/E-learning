package com.elearningportal.apps.repository.search;

import com.elearningportal.apps.domain.EducationCollege;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EducationCollege entity.
 */
public interface EducationCollegeSearchRepository extends ElasticsearchRepository<EducationCollege, Long> {
}

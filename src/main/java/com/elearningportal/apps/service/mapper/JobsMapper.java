package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.JobsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Jobs and its DTO JobsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface JobsMapper extends EntityMapper<JobsDTO, Jobs> {



    default Jobs fromId(Long id) {
        if (id == null) {
            return null;
        }
        Jobs jobs = new Jobs();
        jobs.setId(id);
        return jobs;
    }
}

package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.EducationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Education and its DTO EducationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EducationMapper extends EntityMapper<EducationDTO, Education> {



    default Education fromId(Long id) {
        if (id == null) {
            return null;
        }
        Education education = new Education();
        education.setId(id);
        return education;
    }
}

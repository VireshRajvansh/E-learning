package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.EducationCollegeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EducationCollege and its DTO EducationCollegeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EducationCollegeMapper extends EntityMapper<EducationCollegeDTO, EducationCollege> {


    @Mapping(target = "students", ignore = true)
    @Mapping(target = "teachers", ignore = true)
    EducationCollege toEntity(EducationCollegeDTO educationCollegeDTO);

    default EducationCollege fromId(Long id) {
        if (id == null) {
            return null;
        }
        EducationCollege educationCollege = new EducationCollege();
        educationCollege.setId(id);
        return educationCollege;
    }
}

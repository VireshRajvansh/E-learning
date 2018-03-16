package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.ServicesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Services and its DTO ServicesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServicesMapper extends EntityMapper<ServicesDTO, Services> {



    default Services fromId(Long id) {
        if (id == null) {
            return null;
        }
        Services services = new Services();
        services.setId(id);
        return services;
    }
}

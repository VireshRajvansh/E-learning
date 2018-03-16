package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.GalleryGroupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GalleryGroup and its DTO GalleryGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GalleryGroupMapper extends EntityMapper<GalleryGroupDTO, GalleryGroup> {


    @Mapping(target = "galleries", ignore = true)
    GalleryGroup toEntity(GalleryGroupDTO galleryGroupDTO);

    default GalleryGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        GalleryGroup galleryGroup = new GalleryGroup();
        galleryGroup.setId(id);
        return galleryGroup;
    }
}

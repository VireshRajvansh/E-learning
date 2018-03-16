package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.GalleryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Gallery and its DTO GalleryDTO.
 */
@Mapper(componentModel = "spring", uses = {GalleryGroupMapper.class})
public interface GalleryMapper extends EntityMapper<GalleryDTO, Gallery> {

    @Mapping(source = "galleryGroup.id", target = "galleryGroupId")
    @Mapping(source = "galleryGroup.name", target = "galleryGroupName")
    GalleryDTO toDto(Gallery gallery);

    @Mapping(source = "galleryGroupId", target = "galleryGroup")
    Gallery toEntity(GalleryDTO galleryDTO);

    default Gallery fromId(Long id) {
        if (id == null) {
            return null;
        }
        Gallery gallery = new Gallery();
        gallery.setId(id);
        return gallery;
    }
}

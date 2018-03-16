package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.PlayListDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PlayList and its DTO PlayListDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PlayListMapper extends EntityMapper<PlayListDTO, PlayList> {



    default PlayList fromId(Long id) {
        if (id == null) {
            return null;
        }
        PlayList playList = new PlayList();
        playList.setId(id);
        return playList;
    }
}

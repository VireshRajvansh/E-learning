package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.OfferDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Offer and its DTO OfferDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OfferMapper extends EntityMapper<OfferDTO, Offer> {



    default Offer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Offer offer = new Offer();
        offer.setId(id);
        return offer;
    }
}

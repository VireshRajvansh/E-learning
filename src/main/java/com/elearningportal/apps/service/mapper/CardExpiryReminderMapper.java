package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.CardExpiryReminderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CardExpiryReminder and its DTO CardExpiryReminderDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CardExpiryReminderMapper extends EntityMapper<CardExpiryReminderDTO, CardExpiryReminder> {



    default CardExpiryReminder fromId(Long id) {
        if (id == null) {
            return null;
        }
        CardExpiryReminder cardExpiryReminder = new CardExpiryReminder();
        cardExpiryReminder.setId(id);
        return cardExpiryReminder;
    }
}

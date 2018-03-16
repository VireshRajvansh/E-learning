package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.StripeTransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StripeTransaction and its DTO StripeTransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StripeTransactionMapper extends EntityMapper<StripeTransactionDTO, StripeTransaction> {



    default StripeTransaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        StripeTransaction stripeTransaction = new StripeTransaction();
        stripeTransaction.setId(id);
        return stripeTransaction;
    }
}

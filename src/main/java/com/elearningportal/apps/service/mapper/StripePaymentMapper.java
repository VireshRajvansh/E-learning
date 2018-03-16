package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.StripePaymentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StripePayment and its DTO StripePaymentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface StripePaymentMapper extends EntityMapper<StripePaymentDTO, StripePayment> {

    @Mapping(source = "user.id", target = "userId")
    StripePaymentDTO toDto(StripePayment stripePayment);

    @Mapping(source = "userId", target = "user")
    StripePayment toEntity(StripePaymentDTO stripePaymentDTO);

    default StripePayment fromId(Long id) {
        if (id == null) {
            return null;
        }
        StripePayment stripePayment = new StripePayment();
        stripePayment.setId(id);
        return stripePayment;
    }
}

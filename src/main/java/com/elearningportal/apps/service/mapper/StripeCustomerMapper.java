package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.StripeCustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StripeCustomer and its DTO StripeCustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface StripeCustomerMapper extends EntityMapper<StripeCustomerDTO, StripeCustomer> {

    @Mapping(source = "user.id", target = "userId")
    StripeCustomerDTO toDto(StripeCustomer stripeCustomer);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    StripeCustomer toEntity(StripeCustomerDTO stripeCustomerDTO);

    default StripeCustomer fromId(Long id) {
        if (id == null) {
            return null;
        }
        StripeCustomer stripeCustomer = new StripeCustomer();
        stripeCustomer.setId(id);
        return stripeCustomer;
    }
}

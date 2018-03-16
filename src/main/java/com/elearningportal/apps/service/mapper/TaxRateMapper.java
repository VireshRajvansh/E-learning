package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.TaxRateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TaxRate and its DTO TaxRateDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TaxRateMapper extends EntityMapper<TaxRateDTO, TaxRate> {



    default TaxRate fromId(Long id) {
        if (id == null) {
            return null;
        }
        TaxRate taxRate = new TaxRate();
        taxRate.setId(id);
        return taxRate;
    }
}

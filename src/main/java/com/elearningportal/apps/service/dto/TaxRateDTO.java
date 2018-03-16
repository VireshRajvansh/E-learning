package com.elearningportal.apps.service.dto;


import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the TaxRate entity.
 */
public class TaxRateDTO implements Serializable {

    private Long id;

    private String displayName;

    private BigDecimal totalTaxInPct;

    private Integer stateId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public BigDecimal getTotalTaxInPct() {
        return totalTaxInPct;
    }

    public void setTotalTaxInPct(BigDecimal totalTaxInPct) {
        this.totalTaxInPct = totalTaxInPct;
    }

    public Integer getStateId() {
        return stateId;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaxRateDTO taxRateDTO = (TaxRateDTO) o;
        if(taxRateDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taxRateDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaxRateDTO{" +
            "id=" + getId() +
            ", displayName='" + getDisplayName() + "'" +
            ", totalTaxInPct=" + getTotalTaxInPct() +
            ", stateId=" + getStateId() +
            "}";
    }
}

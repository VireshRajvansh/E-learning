package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A TaxRate.
 */
@Entity
@Table(name = "tax_rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "taxrate")
public class TaxRate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "total_tax_in_pct", precision=10, scale=2)
    private BigDecimal totalTaxInPct;

    @Column(name = "state_id")
    private Integer stateId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public TaxRate displayName(String displayName) {
        this.displayName = displayName;
        return this;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public BigDecimal getTotalTaxInPct() {
        return totalTaxInPct;
    }

    public TaxRate totalTaxInPct(BigDecimal totalTaxInPct) {
        this.totalTaxInPct = totalTaxInPct;
        return this;
    }

    public void setTotalTaxInPct(BigDecimal totalTaxInPct) {
        this.totalTaxInPct = totalTaxInPct;
    }

    public Integer getStateId() {
        return stateId;
    }

    public TaxRate stateId(Integer stateId) {
        this.stateId = stateId;
        return this;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TaxRate taxRate = (TaxRate) o;
        if (taxRate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taxRate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaxRate{" +
            "id=" + getId() +
            ", displayName='" + getDisplayName() + "'" +
            ", totalTaxInPct=" + getTotalTaxInPct() +
            ", stateId=" + getStateId() +
            "}";
    }
}

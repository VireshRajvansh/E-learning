package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A StripeTransaction.
 */
@Entity
@Table(name = "stripe_transaction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stripetransaction")
public class StripeTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "strip_response")
    private String stripResponse;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStripResponse() {
        return stripResponse;
    }

    public StripeTransaction stripResponse(String stripResponse) {
        this.stripResponse = stripResponse;
        return this;
    }

    public void setStripResponse(String stripResponse) {
        this.stripResponse = stripResponse;
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
        StripeTransaction stripeTransaction = (StripeTransaction) o;
        if (stripeTransaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stripeTransaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StripeTransaction{" +
            "id=" + getId() +
            ", stripResponse='" + getStripResponse() + "'" +
            "}";
    }
}

package com.elearningportal.apps.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the StripeTransaction entity.
 */
public class StripeTransactionDTO implements Serializable {

    private Long id;

    private String stripResponse;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStripResponse() {
        return stripResponse;
    }

    public void setStripResponse(String stripResponse) {
        this.stripResponse = stripResponse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StripeTransactionDTO stripeTransactionDTO = (StripeTransactionDTO) o;
        if(stripeTransactionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stripeTransactionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StripeTransactionDTO{" +
            "id=" + getId() +
            ", stripResponse='" + getStripResponse() + "'" +
            "}";
    }
}

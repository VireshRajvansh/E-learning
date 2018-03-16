package com.elearningportal.apps.service.dto;


import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the StripeCustomer entity.
 */
public class StripeCustomerDTO implements Serializable {

    private Long id;

    @Size(max = 100)
    private String name;

    private ZonedDateTime created;

    @Size(max = 100)
    private String email;

    @Size(max = 3)
    private String currency;

    @Size(max = 50)
    private String stripeCustomerId;

    @Size(max = 50)
    private String stripeSubscriptionId;

    @Size(max = 50)
    private String stripeStatus;

    @Size(max = 100)
    private String plan;

    @Size(max = 50)
    private String ccBrand;

    @Max(value = 10)
    private Integer ccLast4;

    @Size(max = 20)
    private String expMonth;

    @Size(max = 20)
    private String expYear;

    private Boolean isCancelled;

    private String cardId;

    private LocalDate expectedExpiryDate;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public String getStripeSubscriptionId() {
        return stripeSubscriptionId;
    }

    public void setStripeSubscriptionId(String stripeSubscriptionId) {
        this.stripeSubscriptionId = stripeSubscriptionId;
    }

    public String getStripeStatus() {
        return stripeStatus;
    }

    public void setStripeStatus(String stripeStatus) {
        this.stripeStatus = stripeStatus;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public String getCcBrand() {
        return ccBrand;
    }

    public void setCcBrand(String ccBrand) {
        this.ccBrand = ccBrand;
    }

    public Integer getCcLast4() {
        return ccLast4;
    }

    public void setCcLast4(Integer ccLast4) {
        this.ccLast4 = ccLast4;
    }

    public String getExpMonth() {
        return expMonth;
    }

    public void setExpMonth(String expMonth) {
        this.expMonth = expMonth;
    }

    public String getExpYear() {
        return expYear;
    }

    public void setExpYear(String expYear) {
        this.expYear = expYear;
    }

    public Boolean isIsCancelled() {
        return isCancelled;
    }

    public void setIsCancelled(Boolean isCancelled) {
        this.isCancelled = isCancelled;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public LocalDate getExpectedExpiryDate() {
        return expectedExpiryDate;
    }

    public void setExpectedExpiryDate(LocalDate expectedExpiryDate) {
        this.expectedExpiryDate = expectedExpiryDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StripeCustomerDTO stripeCustomerDTO = (StripeCustomerDTO) o;
        if(stripeCustomerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stripeCustomerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StripeCustomerDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", created='" + getCreated() + "'" +
            ", email='" + getEmail() + "'" +
            ", currency='" + getCurrency() + "'" +
            ", stripeCustomerId='" + getStripeCustomerId() + "'" +
            ", stripeSubscriptionId='" + getStripeSubscriptionId() + "'" +
            ", stripeStatus='" + getStripeStatus() + "'" +
            ", plan='" + getPlan() + "'" +
            ", ccBrand='" + getCcBrand() + "'" +
            ", ccLast4=" + getCcLast4() +
            ", expMonth='" + getExpMonth() + "'" +
            ", expYear='" + getExpYear() + "'" +
            ", isCancelled='" + isIsCancelled() + "'" +
            ", cardId='" + getCardId() + "'" +
            ", expectedExpiryDate='" + getExpectedExpiryDate() + "'" +
            "}";
    }
}

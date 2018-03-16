package com.elearningportal.apps.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the StripePayment entity.
 */
public class StripePaymentDTO implements Serializable {

    private Long id;

    @Size(max = 50)
    private String stripeCustomerId;

    private String invoiceId;

    private String planId;

    private String planName;

    private String charge;

    private ZonedDateTime created;

    private Double amount;

    private Double planAmount;

    private ZonedDateTime planCreated;

    @Size(max = 3)
    private String planCurrency;

    @Size(max = 50)
    private String planInterval;

    @Max(value = 6)
    private Integer planIntervalCount;

    private Boolean liveMode;

    private Boolean paid;

    private ZonedDateTime periodEnd;

    private ZonedDateTime periodStart;

    @Size(max = 50)
    private String subscriptionValue;

    private Double subtotal;

    @Size(max = 50)
    private String tax;

    @Size(max = 50)
    private String taxPercent;

    private String taxDisplayName;

    private Double total;

    @Size(max = 3)
    private String currency;

    @Size(max = 100)
    private String stripeCode;

    private Boolean isSuccess;

    private String invoiceNumber;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getPlanId() {
        return planId;
    }

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getCharge() {
        return charge;
    }

    public void setCharge(String charge) {
        this.charge = charge;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getPlanAmount() {
        return planAmount;
    }

    public void setPlanAmount(Double planAmount) {
        this.planAmount = planAmount;
    }

    public ZonedDateTime getPlanCreated() {
        return planCreated;
    }

    public void setPlanCreated(ZonedDateTime planCreated) {
        this.planCreated = planCreated;
    }

    public String getPlanCurrency() {
        return planCurrency;
    }

    public void setPlanCurrency(String planCurrency) {
        this.planCurrency = planCurrency;
    }

    public String getPlanInterval() {
        return planInterval;
    }

    public void setPlanInterval(String planInterval) {
        this.planInterval = planInterval;
    }

    public Integer getPlanIntervalCount() {
        return planIntervalCount;
    }

    public void setPlanIntervalCount(Integer planIntervalCount) {
        this.planIntervalCount = planIntervalCount;
    }

    public Boolean isLiveMode() {
        return liveMode;
    }

    public void setLiveMode(Boolean liveMode) {
        this.liveMode = liveMode;
    }

    public Boolean isPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public ZonedDateTime getPeriodEnd() {
        return periodEnd;
    }

    public void setPeriodEnd(ZonedDateTime periodEnd) {
        this.periodEnd = periodEnd;
    }

    public ZonedDateTime getPeriodStart() {
        return periodStart;
    }

    public void setPeriodStart(ZonedDateTime periodStart) {
        this.periodStart = periodStart;
    }

    public String getSubscriptionValue() {
        return subscriptionValue;
    }

    public void setSubscriptionValue(String subscriptionValue) {
        this.subscriptionValue = subscriptionValue;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getTaxPercent() {
        return taxPercent;
    }

    public void setTaxPercent(String taxPercent) {
        this.taxPercent = taxPercent;
    }

    public String getTaxDisplayName() {
        return taxDisplayName;
    }

    public void setTaxDisplayName(String taxDisplayName) {
        this.taxDisplayName = taxDisplayName;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getStripeCode() {
        return stripeCode;
    }

    public void setStripeCode(String stripeCode) {
        this.stripeCode = stripeCode;
    }

    public Boolean isIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
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

        StripePaymentDTO stripePaymentDTO = (StripePaymentDTO) o;
        if(stripePaymentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stripePaymentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StripePaymentDTO{" +
            "id=" + getId() +
            ", stripeCustomerId='" + getStripeCustomerId() + "'" +
            ", invoiceId='" + getInvoiceId() + "'" +
            ", planId='" + getPlanId() + "'" +
            ", planName='" + getPlanName() + "'" +
            ", charge='" + getCharge() + "'" +
            ", created='" + getCreated() + "'" +
            ", amount=" + getAmount() +
            ", planAmount=" + getPlanAmount() +
            ", planCreated='" + getPlanCreated() + "'" +
            ", planCurrency='" + getPlanCurrency() + "'" +
            ", planInterval='" + getPlanInterval() + "'" +
            ", planIntervalCount=" + getPlanIntervalCount() +
            ", liveMode='" + isLiveMode() + "'" +
            ", paid='" + isPaid() + "'" +
            ", periodEnd='" + getPeriodEnd() + "'" +
            ", periodStart='" + getPeriodStart() + "'" +
            ", subscriptionValue='" + getSubscriptionValue() + "'" +
            ", subtotal=" + getSubtotal() +
            ", tax='" + getTax() + "'" +
            ", taxPercent='" + getTaxPercent() + "'" +
            ", taxDisplayName='" + getTaxDisplayName() + "'" +
            ", total=" + getTotal() +
            ", currency='" + getCurrency() + "'" +
            ", stripeCode='" + getStripeCode() + "'" +
            ", isSuccess='" + isIsSuccess() + "'" +
            ", invoiceNumber='" + getInvoiceNumber() + "'" +
            "}";
    }
}

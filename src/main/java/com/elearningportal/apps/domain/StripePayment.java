package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A StripePayment.
 */
@Entity
@Table(name = "stripe_payment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stripepayment")
public class StripePayment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "stripe_customer_id", length = 50)
    private String stripeCustomerId;

    @Column(name = "invoice_id")
    private String invoiceId;

    @Column(name = "plan_id")
    private String planId;

    @Column(name = "plan_name")
    private String planName;

    @Column(name = "charge")
    private String charge;

    @Column(name = "created")
    private ZonedDateTime created;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "plan_amount")
    private Double planAmount;

    @Column(name = "plan_created")
    private ZonedDateTime planCreated;

    @Size(max = 3)
    @Column(name = "plan_currency", length = 3)
    private String planCurrency;

    @Size(max = 50)
    @Column(name = "plan_interval", length = 50)
    private String planInterval;

    @Max(value = 6)
    @Column(name = "plan_interval_count")
    private Integer planIntervalCount;

    @Column(name = "live_mode")
    private Boolean liveMode;

    @Column(name = "paid")
    private Boolean paid;

    @Column(name = "period_end")
    private ZonedDateTime periodEnd;

    @Column(name = "period_start")
    private ZonedDateTime periodStart;

    @Size(max = 50)
    @Column(name = "subscription_value", length = 50)
    private String subscriptionValue;

    @Column(name = "subtotal")
    private Double subtotal;

    @Size(max = 50)
    @Column(name = "tax", length = 50)
    private String tax;

    @Size(max = 50)
    @Column(name = "tax_percent", length = 50)
    private String taxPercent;

    @Column(name = "tax_display_name")
    private String taxDisplayName;

    @Column(name = "total")
    private Double total;

    @Size(max = 3)
    @Column(name = "currency", length = 3)
    private String currency;

    @Size(max = 100)
    @Column(name = "stripe_code", length = 100)
    private String stripeCode;

    @Column(name = "is_success")
    private Boolean isSuccess;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public StripePayment stripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
        return this;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public StripePayment invoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
        return this;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getPlanId() {
        return planId;
    }

    public StripePayment planId(String planId) {
        this.planId = planId;
        return this;
    }

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public StripePayment planName(String planName) {
        this.planName = planName;
        return this;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getCharge() {
        return charge;
    }

    public StripePayment charge(String charge) {
        this.charge = charge;
        return this;
    }

    public void setCharge(String charge) {
        this.charge = charge;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public StripePayment created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public Double getAmount() {
        return amount;
    }

    public StripePayment amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getPlanAmount() {
        return planAmount;
    }

    public StripePayment planAmount(Double planAmount) {
        this.planAmount = planAmount;
        return this;
    }

    public void setPlanAmount(Double planAmount) {
        this.planAmount = planAmount;
    }

    public ZonedDateTime getPlanCreated() {
        return planCreated;
    }

    public StripePayment planCreated(ZonedDateTime planCreated) {
        this.planCreated = planCreated;
        return this;
    }

    public void setPlanCreated(ZonedDateTime planCreated) {
        this.planCreated = planCreated;
    }

    public String getPlanCurrency() {
        return planCurrency;
    }

    public StripePayment planCurrency(String planCurrency) {
        this.planCurrency = planCurrency;
        return this;
    }

    public void setPlanCurrency(String planCurrency) {
        this.planCurrency = planCurrency;
    }

    public String getPlanInterval() {
        return planInterval;
    }

    public StripePayment planInterval(String planInterval) {
        this.planInterval = planInterval;
        return this;
    }

    public void setPlanInterval(String planInterval) {
        this.planInterval = planInterval;
    }

    public Integer getPlanIntervalCount() {
        return planIntervalCount;
    }

    public StripePayment planIntervalCount(Integer planIntervalCount) {
        this.planIntervalCount = planIntervalCount;
        return this;
    }

    public void setPlanIntervalCount(Integer planIntervalCount) {
        this.planIntervalCount = planIntervalCount;
    }

    public Boolean isLiveMode() {
        return liveMode;
    }

    public StripePayment liveMode(Boolean liveMode) {
        this.liveMode = liveMode;
        return this;
    }

    public void setLiveMode(Boolean liveMode) {
        this.liveMode = liveMode;
    }

    public Boolean isPaid() {
        return paid;
    }

    public StripePayment paid(Boolean paid) {
        this.paid = paid;
        return this;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public ZonedDateTime getPeriodEnd() {
        return periodEnd;
    }

    public StripePayment periodEnd(ZonedDateTime periodEnd) {
        this.periodEnd = periodEnd;
        return this;
    }

    public void setPeriodEnd(ZonedDateTime periodEnd) {
        this.periodEnd = periodEnd;
    }

    public ZonedDateTime getPeriodStart() {
        return periodStart;
    }

    public StripePayment periodStart(ZonedDateTime periodStart) {
        this.periodStart = periodStart;
        return this;
    }

    public void setPeriodStart(ZonedDateTime periodStart) {
        this.periodStart = periodStart;
    }

    public String getSubscriptionValue() {
        return subscriptionValue;
    }

    public StripePayment subscriptionValue(String subscriptionValue) {
        this.subscriptionValue = subscriptionValue;
        return this;
    }

    public void setSubscriptionValue(String subscriptionValue) {
        this.subscriptionValue = subscriptionValue;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public StripePayment subtotal(Double subtotal) {
        this.subtotal = subtotal;
        return this;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public String getTax() {
        return tax;
    }

    public StripePayment tax(String tax) {
        this.tax = tax;
        return this;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getTaxPercent() {
        return taxPercent;
    }

    public StripePayment taxPercent(String taxPercent) {
        this.taxPercent = taxPercent;
        return this;
    }

    public void setTaxPercent(String taxPercent) {
        this.taxPercent = taxPercent;
    }

    public String getTaxDisplayName() {
        return taxDisplayName;
    }

    public StripePayment taxDisplayName(String taxDisplayName) {
        this.taxDisplayName = taxDisplayName;
        return this;
    }

    public void setTaxDisplayName(String taxDisplayName) {
        this.taxDisplayName = taxDisplayName;
    }

    public Double getTotal() {
        return total;
    }

    public StripePayment total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getCurrency() {
        return currency;
    }

    public StripePayment currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getStripeCode() {
        return stripeCode;
    }

    public StripePayment stripeCode(String stripeCode) {
        this.stripeCode = stripeCode;
        return this;
    }

    public void setStripeCode(String stripeCode) {
        this.stripeCode = stripeCode;
    }

    public Boolean isIsSuccess() {
        return isSuccess;
    }

    public StripePayment isSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
        return this;
    }

    public void setIsSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public StripePayment invoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
        return this;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public User getUser() {
        return user;
    }

    public StripePayment user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        StripePayment stripePayment = (StripePayment) o;
        if (stripePayment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stripePayment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StripePayment{" +
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

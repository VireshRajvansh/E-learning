package com.elearningportal.apps.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A StripeCustomer.
 */
@Entity
@Table(name = "stripe_customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stripecustomer")
public class StripeCustomer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "created")
    private ZonedDateTime created;

    @Size(max = 100)
    @Column(name = "email", length = 100)
    private String email;

    @Size(max = 3)
    @Column(name = "currency", length = 3)
    private String currency;

    @Size(max = 50)
    @Column(name = "stripe_customer_id", length = 50)
    private String stripeCustomerId;

    @Size(max = 50)
    @Column(name = "stripe_subscription_id", length = 50)
    private String stripeSubscriptionId;

    @Size(max = 50)
    @Column(name = "stripe_status", length = 50)
    private String stripeStatus;

    @Size(max = 100)
    @Column(name = "jhi_plan", length = 100)
    private String plan;

    @Size(max = 50)
    @Column(name = "cc_brand", length = 50)
    private String ccBrand;

    @Max(value = 10)
    @Column(name = "cc_last_4")
    private Integer ccLast4;

    @Size(max = 20)
    @Column(name = "exp_month", length = 20)
    private String expMonth;

    @Size(max = 20)
    @Column(name = "exp_year", length = 20)
    private String expYear;

    @Column(name = "is_cancelled")
    private Boolean isCancelled;

    @Column(name = "card_id")
    private String cardId;

    @Column(name = "expected_expiry_date")
    private LocalDate expectedExpiryDate;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne(mappedBy = "stripeCustomer")
    @JsonIgnore
    private Student student;

    @OneToOne(mappedBy = "stripeCustomer")
    @JsonIgnore
    private Teacher teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public StripeCustomer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public StripeCustomer created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public String getEmail() {
        return email;
    }

    public StripeCustomer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCurrency() {
        return currency;
    }

    public StripeCustomer currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public StripeCustomer stripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
        return this;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public String getStripeSubscriptionId() {
        return stripeSubscriptionId;
    }

    public StripeCustomer stripeSubscriptionId(String stripeSubscriptionId) {
        this.stripeSubscriptionId = stripeSubscriptionId;
        return this;
    }

    public void setStripeSubscriptionId(String stripeSubscriptionId) {
        this.stripeSubscriptionId = stripeSubscriptionId;
    }

    public String getStripeStatus() {
        return stripeStatus;
    }

    public StripeCustomer stripeStatus(String stripeStatus) {
        this.stripeStatus = stripeStatus;
        return this;
    }

    public void setStripeStatus(String stripeStatus) {
        this.stripeStatus = stripeStatus;
    }

    public String getPlan() {
        return plan;
    }

    public StripeCustomer plan(String plan) {
        this.plan = plan;
        return this;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public String getCcBrand() {
        return ccBrand;
    }

    public StripeCustomer ccBrand(String ccBrand) {
        this.ccBrand = ccBrand;
        return this;
    }

    public void setCcBrand(String ccBrand) {
        this.ccBrand = ccBrand;
    }

    public Integer getCcLast4() {
        return ccLast4;
    }

    public StripeCustomer ccLast4(Integer ccLast4) {
        this.ccLast4 = ccLast4;
        return this;
    }

    public void setCcLast4(Integer ccLast4) {
        this.ccLast4 = ccLast4;
    }

    public String getExpMonth() {
        return expMonth;
    }

    public StripeCustomer expMonth(String expMonth) {
        this.expMonth = expMonth;
        return this;
    }

    public void setExpMonth(String expMonth) {
        this.expMonth = expMonth;
    }

    public String getExpYear() {
        return expYear;
    }

    public StripeCustomer expYear(String expYear) {
        this.expYear = expYear;
        return this;
    }

    public void setExpYear(String expYear) {
        this.expYear = expYear;
    }

    public Boolean isIsCancelled() {
        return isCancelled;
    }

    public StripeCustomer isCancelled(Boolean isCancelled) {
        this.isCancelled = isCancelled;
        return this;
    }

    public void setIsCancelled(Boolean isCancelled) {
        this.isCancelled = isCancelled;
    }

    public String getCardId() {
        return cardId;
    }

    public StripeCustomer cardId(String cardId) {
        this.cardId = cardId;
        return this;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public LocalDate getExpectedExpiryDate() {
        return expectedExpiryDate;
    }

    public StripeCustomer expectedExpiryDate(LocalDate expectedExpiryDate) {
        this.expectedExpiryDate = expectedExpiryDate;
        return this;
    }

    public void setExpectedExpiryDate(LocalDate expectedExpiryDate) {
        this.expectedExpiryDate = expectedExpiryDate;
    }

    public User getUser() {
        return user;
    }

    public StripeCustomer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Student getStudent() {
        return student;
    }

    public StripeCustomer student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public StripeCustomer teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
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
        StripeCustomer stripeCustomer = (StripeCustomer) o;
        if (stripeCustomer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stripeCustomer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StripeCustomer{" +
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

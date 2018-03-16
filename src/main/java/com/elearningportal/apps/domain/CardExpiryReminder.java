package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A CardExpiryReminder.
 */
@Entity
@Table(name = "card_expiry_reminder")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "cardexpiryreminder")
public class CardExpiryReminder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "message_type")
    private String messageType;

    @Column(name = "send_on_date")
    private LocalDate sendOnDate;

    @Column(name = "is_complete")
    private Boolean isComplete;

    @Column(name = "ref_data")
    private String refData;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public CardExpiryReminder userId(Integer userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getMessageType() {
        return messageType;
    }

    public CardExpiryReminder messageType(String messageType) {
        this.messageType = messageType;
        return this;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public LocalDate getSendOnDate() {
        return sendOnDate;
    }

    public CardExpiryReminder sendOnDate(LocalDate sendOnDate) {
        this.sendOnDate = sendOnDate;
        return this;
    }

    public void setSendOnDate(LocalDate sendOnDate) {
        this.sendOnDate = sendOnDate;
    }

    public Boolean isIsComplete() {
        return isComplete;
    }

    public CardExpiryReminder isComplete(Boolean isComplete) {
        this.isComplete = isComplete;
        return this;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public String getRefData() {
        return refData;
    }

    public CardExpiryReminder refData(String refData) {
        this.refData = refData;
        return this;
    }

    public void setRefData(String refData) {
        this.refData = refData;
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
        CardExpiryReminder cardExpiryReminder = (CardExpiryReminder) o;
        if (cardExpiryReminder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cardExpiryReminder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CardExpiryReminder{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", messageType='" + getMessageType() + "'" +
            ", sendOnDate='" + getSendOnDate() + "'" +
            ", isComplete='" + isIsComplete() + "'" +
            ", refData='" + getRefData() + "'" +
            "}";
    }
}

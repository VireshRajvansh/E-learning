package com.elearningportal.apps.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CardExpiryReminder entity.
 */
public class CardExpiryReminderDTO implements Serializable {

    private Long id;

    private Integer userId;

    private String messageType;

    private LocalDate sendOnDate;

    private Boolean isComplete;

    private String refData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public LocalDate getSendOnDate() {
        return sendOnDate;
    }

    public void setSendOnDate(LocalDate sendOnDate) {
        this.sendOnDate = sendOnDate;
    }

    public Boolean isIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public String getRefData() {
        return refData;
    }

    public void setRefData(String refData) {
        this.refData = refData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CardExpiryReminderDTO cardExpiryReminderDTO = (CardExpiryReminderDTO) o;
        if(cardExpiryReminderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cardExpiryReminderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CardExpiryReminderDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", messageType='" + getMessageType() + "'" +
            ", sendOnDate='" + getSendOnDate() + "'" +
            ", isComplete='" + isIsComplete() + "'" +
            ", refData='" + getRefData() + "'" +
            "}";
    }
}

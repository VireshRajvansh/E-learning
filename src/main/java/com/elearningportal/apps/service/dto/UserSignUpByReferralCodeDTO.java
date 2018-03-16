package com.elearningportal.apps.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the UserSignUpByReferralCode entity.
 */
public class UserSignUpByReferralCodeDTO implements Serializable {

    private Long id;

    private String referralCode;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferralCode() {
        return referralCode;
    }

    public void setReferralCode(String referralCode) {
        this.referralCode = referralCode;
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

        UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO = (UserSignUpByReferralCodeDTO) o;
        if(userSignUpByReferralCodeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userSignUpByReferralCodeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserSignUpByReferralCodeDTO{" +
            "id=" + getId() +
            ", referralCode='" + getReferralCode() + "'" +
            "}";
    }
}

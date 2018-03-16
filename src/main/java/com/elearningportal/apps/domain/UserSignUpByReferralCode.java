package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserSignUpByReferralCode.
 */
@Entity
@Table(name = "user_sign_up_by_referral_code")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "usersignupbyreferralcode")
public class UserSignUpByReferralCode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "referral_code")
    private String referralCode;

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

    public String getReferralCode() {
        return referralCode;
    }

    public UserSignUpByReferralCode referralCode(String referralCode) {
        this.referralCode = referralCode;
        return this;
    }

    public void setReferralCode(String referralCode) {
        this.referralCode = referralCode;
    }

    public User getUser() {
        return user;
    }

    public UserSignUpByReferralCode user(User user) {
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
        UserSignUpByReferralCode userSignUpByReferralCode = (UserSignUpByReferralCode) o;
        if (userSignUpByReferralCode.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userSignUpByReferralCode.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserSignUpByReferralCode{" +
            "id=" + getId() +
            ", referralCode='" + getReferralCode() + "'" +
            "}";
    }
}

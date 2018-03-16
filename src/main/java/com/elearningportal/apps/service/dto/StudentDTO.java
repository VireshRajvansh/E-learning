package com.elearningportal.apps.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Student entity.
 */
public class StudentDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 50)
    private String name;

    private String about;

    private String imageUrl;

    @Min(value = 1900)
    @Max(value = 2099)
    private Integer collegeYear;

    private LocalDate dob;

    private String mobile;

    private String alternativeMobile;

    private Boolean premium;

    private Boolean active;

    private String languagesSpoken;

    @NotNull
    @Size(max = 100)
    private String slug;

    private LocalDate premiumTill;

    private String referenceCode;

    private String signUpByReferenceCode;

    @Size(max = 250)
    private String websiteURL;

    @Size(max = 250)
    private String twitter;

    @Size(max = 250)
    private String facebook;

    @Size(max = 250)
    private String googlePlus;

    @Size(max = 250)
    private String linkedIn;

    private Long stripeCustomerId;

    private Long userId;

    private String userLogin;

    private Long addressId;

    private Long collegeId;

    private String collegeName;

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

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getCollegeYear() {
        return collegeYear;
    }

    public void setCollegeYear(Integer collegeYear) {
        this.collegeYear = collegeYear;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAlternativeMobile() {
        return alternativeMobile;
    }

    public void setAlternativeMobile(String alternativeMobile) {
        this.alternativeMobile = alternativeMobile;
    }

    public Boolean isPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getLanguagesSpoken() {
        return languagesSpoken;
    }

    public void setLanguagesSpoken(String languagesSpoken) {
        this.languagesSpoken = languagesSpoken;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public LocalDate getPremiumTill() {
        return premiumTill;
    }

    public void setPremiumTill(LocalDate premiumTill) {
        this.premiumTill = premiumTill;
    }

    public String getReferenceCode() {
        return referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public String getSignUpByReferenceCode() {
        return signUpByReferenceCode;
    }

    public void setSignUpByReferenceCode(String signUpByReferenceCode) {
        this.signUpByReferenceCode = signUpByReferenceCode;
    }

    public String getWebsiteURL() {
        return websiteURL;
    }

    public void setWebsiteURL(String websiteURL) {
        this.websiteURL = websiteURL;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getGooglePlus() {
        return googlePlus;
    }

    public void setGooglePlus(String googlePlus) {
        this.googlePlus = googlePlus;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public Long getStripeCustomerId() {
        return stripeCustomerId;
    }

    public void setStripeCustomerId(Long stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public Long getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(Long educationCollegeId) {
        this.collegeId = educationCollegeId;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String educationCollegeName) {
        this.collegeName = educationCollegeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentDTO studentDTO = (StudentDTO) o;
        if(studentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", about='" + getAbout() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", collegeYear=" + getCollegeYear() +
            ", dob='" + getDob() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", alternativeMobile='" + getAlternativeMobile() + "'" +
            ", premium='" + isPremium() + "'" +
            ", active='" + isActive() + "'" +
            ", languagesSpoken='" + getLanguagesSpoken() + "'" +
            ", slug='" + getSlug() + "'" +
            ", premiumTill='" + getPremiumTill() + "'" +
            ", referenceCode='" + getReferenceCode() + "'" +
            ", signUpByReferenceCode='" + getSignUpByReferenceCode() + "'" +
            ", websiteURL='" + getWebsiteURL() + "'" +
            ", twitter='" + getTwitter() + "'" +
            ", facebook='" + getFacebook() + "'" +
            ", googlePlus='" + getGooglePlus() + "'" +
            ", linkedIn='" + getLinkedIn() + "'" +
            "}";
    }
}

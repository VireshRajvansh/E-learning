package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "teacher")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "about")
    private String about;

    @Column(name = "image_url")
    private String imageUrl;

    @Min(value = 1900)
    @Max(value = 2099)
    @Column(name = "college_year")
    private Integer collegeYear;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "alternative_mobile")
    private String alternativeMobile;

    @Column(name = "premium")
    private Boolean premium;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "languages_spoken")
    private String languagesSpoken;

    @NotNull
    @Size(max = 100)
    @Column(name = "slug", length = 100, nullable = false)
    private String slug;

    @Column(name = "premium_till")
    private LocalDate premiumTill;

    @Column(name = "reference_code")
    private String referenceCode;

    @Column(name = "sign_up_by_reference_code")
    private String signUpByReferenceCode;

    @Size(max = 250)
    @Column(name = "website_url", length = 250)
    private String websiteURL;

    @Size(max = 250)
    @Column(name = "twitter", length = 250)
    private String twitter;

    @Size(max = 250)
    @Column(name = "facebook", length = 250)
    private String facebook;

    @Size(max = 250)
    @Column(name = "google_plus", length = 250)
    private String googlePlus;

    @Size(max = 250)
    @Column(name = "linked_in", length = 250)
    private String linkedIn;

    @OneToOne
    @JoinColumn(unique = true)
    private StripeCustomer stripeCustomer;

    @ManyToOne
    private User user;

    @ManyToOne
    private Address address;

    @ManyToOne
    private EducationCollege college;

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

    public Teacher name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbout() {
        return about;
    }

    public Teacher about(String about) {
        this.about = about;
        return this;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Teacher imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getCollegeYear() {
        return collegeYear;
    }

    public Teacher collegeYear(Integer collegeYear) {
        this.collegeYear = collegeYear;
        return this;
    }

    public void setCollegeYear(Integer collegeYear) {
        this.collegeYear = collegeYear;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Teacher dob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getMobile() {
        return mobile;
    }

    public Teacher mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAlternativeMobile() {
        return alternativeMobile;
    }

    public Teacher alternativeMobile(String alternativeMobile) {
        this.alternativeMobile = alternativeMobile;
        return this;
    }

    public void setAlternativeMobile(String alternativeMobile) {
        this.alternativeMobile = alternativeMobile;
    }

    public Boolean isPremium() {
        return premium;
    }

    public Teacher premium(Boolean premium) {
        this.premium = premium;
        return this;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public Boolean isActive() {
        return active;
    }

    public Teacher active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getLanguagesSpoken() {
        return languagesSpoken;
    }

    public Teacher languagesSpoken(String languagesSpoken) {
        this.languagesSpoken = languagesSpoken;
        return this;
    }

    public void setLanguagesSpoken(String languagesSpoken) {
        this.languagesSpoken = languagesSpoken;
    }

    public String getSlug() {
        return slug;
    }

    public Teacher slug(String slug) {
        this.slug = slug;
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public LocalDate getPremiumTill() {
        return premiumTill;
    }

    public Teacher premiumTill(LocalDate premiumTill) {
        this.premiumTill = premiumTill;
        return this;
    }

    public void setPremiumTill(LocalDate premiumTill) {
        this.premiumTill = premiumTill;
    }

    public String getReferenceCode() {
        return referenceCode;
    }

    public Teacher referenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
        return this;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public String getSignUpByReferenceCode() {
        return signUpByReferenceCode;
    }

    public Teacher signUpByReferenceCode(String signUpByReferenceCode) {
        this.signUpByReferenceCode = signUpByReferenceCode;
        return this;
    }

    public void setSignUpByReferenceCode(String signUpByReferenceCode) {
        this.signUpByReferenceCode = signUpByReferenceCode;
    }

    public String getWebsiteURL() {
        return websiteURL;
    }

    public Teacher websiteURL(String websiteURL) {
        this.websiteURL = websiteURL;
        return this;
    }

    public void setWebsiteURL(String websiteURL) {
        this.websiteURL = websiteURL;
    }

    public String getTwitter() {
        return twitter;
    }

    public Teacher twitter(String twitter) {
        this.twitter = twitter;
        return this;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getFacebook() {
        return facebook;
    }

    public Teacher facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getGooglePlus() {
        return googlePlus;
    }

    public Teacher googlePlus(String googlePlus) {
        this.googlePlus = googlePlus;
        return this;
    }

    public void setGooglePlus(String googlePlus) {
        this.googlePlus = googlePlus;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public Teacher linkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
        return this;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public StripeCustomer getStripeCustomer() {
        return stripeCustomer;
    }

    public Teacher stripeCustomer(StripeCustomer stripeCustomer) {
        this.stripeCustomer = stripeCustomer;
        return this;
    }

    public void setStripeCustomer(StripeCustomer stripeCustomer) {
        this.stripeCustomer = stripeCustomer;
    }

    public User getUser() {
        return user;
    }

    public Teacher user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getAddress() {
        return address;
    }

    public Teacher address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public EducationCollege getCollege() {
        return college;
    }

    public Teacher college(EducationCollege educationCollege) {
        this.college = educationCollege;
        return this;
    }

    public void setCollege(EducationCollege educationCollege) {
        this.college = educationCollege;
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
        Teacher teacher = (Teacher) o;
        if (teacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teacher{" +
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

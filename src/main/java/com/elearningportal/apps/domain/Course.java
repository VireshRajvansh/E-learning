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
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "course")
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "slug")
    private String slug;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "short_desc")
    private String shortDesc;

    @Column(name = "categories")
    private String categories;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "premium")
    private Boolean premium;

    @Column(name = "course_hrs")
    private String courseHrs;

    @Size(max = 100)
    @Column(name = "tag_line", length = 100)
    private String tagLine;

    @Column(name = "premium_till")
    private LocalDate premiumTill;

    @ManyToOne
    private PlayList playlist;

    @ManyToOne
    private User user;

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

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public Course slug(String slug) {
        this.slug = slug;
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getType() {
        return type;
    }

    public Course type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public Course shortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
        return this;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public String getCategories() {
        return categories;
    }

    public Course categories(String categories) {
        this.categories = categories;
        return this;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public Boolean isActive() {
        return active;
    }

    public Course active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isPremium() {
        return premium;
    }

    public Course premium(Boolean premium) {
        this.premium = premium;
        return this;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public String getCourseHrs() {
        return courseHrs;
    }

    public Course courseHrs(String courseHrs) {
        this.courseHrs = courseHrs;
        return this;
    }

    public void setCourseHrs(String courseHrs) {
        this.courseHrs = courseHrs;
    }

    public String getTagLine() {
        return tagLine;
    }

    public Course tagLine(String tagLine) {
        this.tagLine = tagLine;
        return this;
    }

    public void setTagLine(String tagLine) {
        this.tagLine = tagLine;
    }

    public LocalDate getPremiumTill() {
        return premiumTill;
    }

    public Course premiumTill(LocalDate premiumTill) {
        this.premiumTill = premiumTill;
        return this;
    }

    public void setPremiumTill(LocalDate premiumTill) {
        this.premiumTill = premiumTill;
    }

    public PlayList getPlaylist() {
        return playlist;
    }

    public Course playlist(PlayList playList) {
        this.playlist = playList;
        return this;
    }

    public void setPlaylist(PlayList playList) {
        this.playlist = playList;
    }

    public User getUser() {
        return user;
    }

    public Course user(User user) {
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
        Course course = (Course) o;
        if (course.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), course.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", slug='" + getSlug() + "'" +
            ", type='" + getType() + "'" +
            ", shortDesc='" + getShortDesc() + "'" +
            ", categories='" + getCategories() + "'" +
            ", active='" + isActive() + "'" +
            ", premium='" + isPremium() + "'" +
            ", courseHrs='" + getCourseHrs() + "'" +
            ", tagLine='" + getTagLine() + "'" +
            ", premiumTill='" + getPremiumTill() + "'" +
            "}";
    }
}

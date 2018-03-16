package com.elearningportal.apps.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Course entity.
 */
public class CourseDTO implements Serializable {

    private Long id;

    private String name;

    private String slug;

    private String type;

    private String shortDesc;

    private String categories;

    private Boolean active;

    private Boolean premium;

    private String courseHrs;

    @Size(max = 100)
    private String tagLine;

    private LocalDate premiumTill;

    private Long playlistId;

    private String playlistName;

    private Long userId;

    private String userLogin;

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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public String getCourseHrs() {
        return courseHrs;
    }

    public void setCourseHrs(String courseHrs) {
        this.courseHrs = courseHrs;
    }

    public String getTagLine() {
        return tagLine;
    }

    public void setTagLine(String tagLine) {
        this.tagLine = tagLine;
    }

    public LocalDate getPremiumTill() {
        return premiumTill;
    }

    public void setPremiumTill(LocalDate premiumTill) {
        this.premiumTill = premiumTill;
    }

    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playListId) {
        this.playlistId = playListId;
    }

    public String getPlaylistName() {
        return playlistName;
    }

    public void setPlaylistName(String playListName) {
        this.playlistName = playListName;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CourseDTO courseDTO = (CourseDTO) o;
        if(courseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
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

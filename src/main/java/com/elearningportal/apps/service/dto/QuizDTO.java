package com.elearningportal.apps.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Quiz entity.
 */
public class QuizDTO implements Serializable {

    private Long id;

    private String name;

    private String slug;

    private String text;

    private String type;

    private String shortDesc;

    private Boolean isComplete;

    @Size(max = 100)
    private String tagLine;

    private Boolean active;

    private Boolean selected;

    private Long quizAnsId;

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public Boolean isIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public String getTagLine() {
        return tagLine;
    }

    public void setTagLine(String tagLine) {
        this.tagLine = tagLine;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    public Long getQuizAnsId() {
        return quizAnsId;
    }

    public void setQuizAnsId(Long quizAnsId) {
        this.quizAnsId = quizAnsId;
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

        QuizDTO quizDTO = (QuizDTO) o;
        if(quizDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quizDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuizDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", slug='" + getSlug() + "'" +
            ", text='" + getText() + "'" +
            ", type='" + getType() + "'" +
            ", shortDesc='" + getShortDesc() + "'" +
            ", isComplete='" + isIsComplete() + "'" +
            ", tagLine='" + getTagLine() + "'" +
            ", active='" + isActive() + "'" +
            ", selected='" + isSelected() + "'" +
            "}";
    }
}

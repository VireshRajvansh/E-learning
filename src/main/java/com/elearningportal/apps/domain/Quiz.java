package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Quiz.
 */
@Entity
@Table(name = "quiz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "quiz")
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "slug")
    private String slug;

    @Column(name = "text")
    private String text;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "short_desc")
    private String shortDesc;

    @Column(name = "is_complete")
    private Boolean isComplete;

    @Size(max = 100)
    @Column(name = "tag_line", length = 100)
    private String tagLine;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "selected")
    private Boolean selected;

    @OneToOne
    @JoinColumn(unique = true)
    private QuizAns quizAns;

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

    public Quiz name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public Quiz slug(String slug) {
        this.slug = slug;
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getText() {
        return text;
    }

    public Quiz text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getType() {
        return type;
    }

    public Quiz type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public Quiz shortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
        return this;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public Boolean isIsComplete() {
        return isComplete;
    }

    public Quiz isComplete(Boolean isComplete) {
        this.isComplete = isComplete;
        return this;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public String getTagLine() {
        return tagLine;
    }

    public Quiz tagLine(String tagLine) {
        this.tagLine = tagLine;
        return this;
    }

    public void setTagLine(String tagLine) {
        this.tagLine = tagLine;
    }

    public Boolean isActive() {
        return active;
    }

    public Quiz active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isSelected() {
        return selected;
    }

    public Quiz selected(Boolean selected) {
        this.selected = selected;
        return this;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    public QuizAns getQuizAns() {
        return quizAns;
    }

    public Quiz quizAns(QuizAns quizAns) {
        this.quizAns = quizAns;
        return this;
    }

    public void setQuizAns(QuizAns quizAns) {
        this.quizAns = quizAns;
    }

    public User getUser() {
        return user;
    }

    public Quiz user(User user) {
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
        Quiz quiz = (Quiz) o;
        if (quiz.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quiz.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Quiz{" +
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

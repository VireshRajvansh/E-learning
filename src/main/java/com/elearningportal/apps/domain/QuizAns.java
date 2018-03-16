package com.elearningportal.apps.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A QuizAns.
 */
@Entity
@Table(name = "quiz_ans")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "quizans")
public class QuizAns implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answers")
    private String answers;

    @OneToOne(mappedBy = "quizAns")
    @JsonIgnore
    private Quiz quiz;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswers() {
        return answers;
    }

    public QuizAns answers(String answers) {
        this.answers = answers;
        return this;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public QuizAns quiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
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
        QuizAns quizAns = (QuizAns) o;
        if (quizAns.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quizAns.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuizAns{" +
            "id=" + getId() +
            ", answers='" + getAnswers() + "'" +
            "}";
    }
}

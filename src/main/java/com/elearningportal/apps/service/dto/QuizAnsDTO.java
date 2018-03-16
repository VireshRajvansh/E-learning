package com.elearningportal.apps.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the QuizAns entity.
 */
public class QuizAnsDTO implements Serializable {

    private Long id;

    private String answers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswers() {
        return answers;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuizAnsDTO quizAnsDTO = (QuizAnsDTO) o;
        if(quizAnsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quizAnsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuizAnsDTO{" +
            "id=" + getId() +
            ", answers='" + getAnswers() + "'" +
            "}";
    }
}

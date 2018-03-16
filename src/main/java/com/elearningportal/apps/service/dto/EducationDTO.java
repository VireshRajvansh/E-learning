package com.elearningportal.apps.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Education entity.
 */
public class EducationDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String name;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EducationDTO educationDTO = (EducationDTO) o;
        if(educationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), educationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EducationDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

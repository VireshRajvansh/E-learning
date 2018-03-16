package com.elearningportal.apps.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Jobs entity.
 */
public class JobsDTO implements Serializable {

    private Long id;

    private String name;

    private LocalDate runon;

    private String type;

    private String cronExpress;

    private Boolean isComplete;

    private String msg;

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

    public LocalDate getRunon() {
        return runon;
    }

    public void setRunon(LocalDate runon) {
        this.runon = runon;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCronExpress() {
        return cronExpress;
    }

    public void setCronExpress(String cronExpress) {
        this.cronExpress = cronExpress;
    }

    public Boolean isIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        JobsDTO jobsDTO = (JobsDTO) o;
        if(jobsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobsDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", runon='" + getRunon() + "'" +
            ", type='" + getType() + "'" +
            ", cronExpress='" + getCronExpress() + "'" +
            ", isComplete='" + isIsComplete() + "'" +
            ", msg='" + getMsg() + "'" +
            "}";
    }
}

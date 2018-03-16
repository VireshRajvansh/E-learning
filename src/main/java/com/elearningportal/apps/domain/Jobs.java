package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Jobs.
 */
@Entity
@Table(name = "jobs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "jobs")
public class Jobs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "runon")
    private LocalDate runon;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "cron_express")
    private String cronExpress;

    @Column(name = "is_complete")
    private Boolean isComplete;

    @Column(name = "msg")
    private String msg;

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

    public Jobs name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getRunon() {
        return runon;
    }

    public Jobs runon(LocalDate runon) {
        this.runon = runon;
        return this;
    }

    public void setRunon(LocalDate runon) {
        this.runon = runon;
    }

    public String getType() {
        return type;
    }

    public Jobs type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCronExpress() {
        return cronExpress;
    }

    public Jobs cronExpress(String cronExpress) {
        this.cronExpress = cronExpress;
        return this;
    }

    public void setCronExpress(String cronExpress) {
        this.cronExpress = cronExpress;
    }

    public Boolean isIsComplete() {
        return isComplete;
    }

    public Jobs isComplete(Boolean isComplete) {
        this.isComplete = isComplete;
        return this;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public String getMsg() {
        return msg;
    }

    public Jobs msg(String msg) {
        this.msg = msg;
        return this;
    }

    public void setMsg(String msg) {
        this.msg = msg;
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
        Jobs jobs = (Jobs) o;
        if (jobs.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobs.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Jobs{" +
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

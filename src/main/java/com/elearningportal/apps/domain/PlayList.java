package com.elearningportal.apps.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PlayList.
 */
@Entity
@Table(name = "play_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "playlist")
public class PlayList implements Serializable {

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

    @Column(name = "length")
    private Integer length;

    @Column(name = "duration")
    private String duration;

    @Size(max = 100)
    @Column(name = "tag_line", length = 100)
    private String tagLine;

    @Column(name = "active")
    private Boolean active;

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

    public PlayList name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public PlayList slug(String slug) {
        this.slug = slug;
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getType() {
        return type;
    }

    public PlayList type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getLength() {
        return length;
    }

    public PlayList length(Integer length) {
        this.length = length;
        return this;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getDuration() {
        return duration;
    }

    public PlayList duration(String duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getTagLine() {
        return tagLine;
    }

    public PlayList tagLine(String tagLine) {
        this.tagLine = tagLine;
        return this;
    }

    public void setTagLine(String tagLine) {
        this.tagLine = tagLine;
    }

    public Boolean isActive() {
        return active;
    }

    public PlayList active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
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
        PlayList playList = (PlayList) o;
        if (playList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), playList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlayList{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", slug='" + getSlug() + "'" +
            ", type='" + getType() + "'" +
            ", length=" + getLength() +
            ", duration='" + getDuration() + "'" +
            ", tagLine='" + getTagLine() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}

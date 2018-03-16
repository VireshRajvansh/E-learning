package com.elearningportal.apps.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GalleryGroup.
 */
@Entity
@Table(name = "gallery_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "gallerygroup")
public class GalleryGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "galleryGroup")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Gallery> galleries = new HashSet<>();

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

    public GalleryGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Gallery> getGalleries() {
        return galleries;
    }

    public GalleryGroup galleries(Set<Gallery> galleries) {
        this.galleries = galleries;
        return this;
    }

    public GalleryGroup addGallery(Gallery gallery) {
        this.galleries.add(gallery);
        gallery.setGalleryGroup(this);
        return this;
    }

    public GalleryGroup removeGallery(Gallery gallery) {
        this.galleries.remove(gallery);
        gallery.setGalleryGroup(null);
        return this;
    }

    public void setGalleries(Set<Gallery> galleries) {
        this.galleries = galleries;
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
        GalleryGroup galleryGroup = (GalleryGroup) o;
        if (galleryGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), galleryGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GalleryGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

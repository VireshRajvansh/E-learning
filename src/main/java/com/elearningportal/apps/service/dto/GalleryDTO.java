package com.elearningportal.apps.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Gallery entity.
 */
public class GalleryDTO implements Serializable {

    private Long id;

    private String imageUrl;

    private Long galleryGroupId;

    private String galleryGroupName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getGalleryGroupId() {
        return galleryGroupId;
    }

    public void setGalleryGroupId(Long galleryGroupId) {
        this.galleryGroupId = galleryGroupId;
    }

    public String getGalleryGroupName() {
        return galleryGroupName;
    }

    public void setGalleryGroupName(String galleryGroupName) {
        this.galleryGroupName = galleryGroupName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GalleryDTO galleryDTO = (GalleryDTO) o;
        if(galleryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), galleryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GalleryDTO{" +
            "id=" + getId() +
            ", imageUrl='" + getImageUrl() + "'" +
            "}";
    }
}

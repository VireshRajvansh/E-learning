package com.elearningportal.apps.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A EducationCollege.
 */
@Entity
@Table(name = "education_college")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "educationcollege")
public class EducationCollege implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @OneToMany(mappedBy = "college")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "college")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

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

    public EducationCollege name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public EducationCollege students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public EducationCollege addStudent(Student student) {
        this.students.add(student);
        student.setCollege(this);
        return this;
    }

    public EducationCollege removeStudent(Student student) {
        this.students.remove(student);
        student.setCollege(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public EducationCollege teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public EducationCollege addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setCollege(this);
        return this;
    }

    public EducationCollege removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setCollege(null);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
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
        EducationCollege educationCollege = (EducationCollege) o;
        if (educationCollege.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), educationCollege.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EducationCollege{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

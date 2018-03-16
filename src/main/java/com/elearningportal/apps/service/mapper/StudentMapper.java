package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {StripeCustomerMapper.class, UserMapper.class, AddressMapper.class, EducationCollegeMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "stripeCustomer.id", target = "stripeCustomerId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "college.id", target = "collegeId")
    @Mapping(source = "college.name", target = "collegeName")
    StudentDTO toDto(Student student);

    @Mapping(source = "stripeCustomerId", target = "stripeCustomer")
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "addressId", target = "address")
    @Mapping(source = "collegeId", target = "college")
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}

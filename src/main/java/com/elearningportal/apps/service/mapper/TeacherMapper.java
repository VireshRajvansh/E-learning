package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.TeacherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Teacher and its DTO TeacherDTO.
 */
@Mapper(componentModel = "spring", uses = {StripeCustomerMapper.class, UserMapper.class, AddressMapper.class, EducationCollegeMapper.class})
public interface TeacherMapper extends EntityMapper<TeacherDTO, Teacher> {

    @Mapping(source = "stripeCustomer.id", target = "stripeCustomerId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "college.id", target = "collegeId")
    @Mapping(source = "college.name", target = "collegeName")
    TeacherDTO toDto(Teacher teacher);

    @Mapping(source = "stripeCustomerId", target = "stripeCustomer")
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "addressId", target = "address")
    @Mapping(source = "collegeId", target = "college")
    Teacher toEntity(TeacherDTO teacherDTO);

    default Teacher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }
}

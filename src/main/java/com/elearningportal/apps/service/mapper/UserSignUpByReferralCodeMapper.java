package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.UserSignUpByReferralCodeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserSignUpByReferralCode and its DTO UserSignUpByReferralCodeDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UserSignUpByReferralCodeMapper extends EntityMapper<UserSignUpByReferralCodeDTO, UserSignUpByReferralCode> {

    @Mapping(source = "user.id", target = "userId")
    UserSignUpByReferralCodeDTO toDto(UserSignUpByReferralCode userSignUpByReferralCode);

    @Mapping(source = "userId", target = "user")
    UserSignUpByReferralCode toEntity(UserSignUpByReferralCodeDTO userSignUpByReferralCodeDTO);

    default UserSignUpByReferralCode fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserSignUpByReferralCode userSignUpByReferralCode = new UserSignUpByReferralCode();
        userSignUpByReferralCode.setId(id);
        return userSignUpByReferralCode;
    }
}

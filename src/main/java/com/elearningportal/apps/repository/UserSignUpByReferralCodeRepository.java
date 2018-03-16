package com.elearningportal.apps.repository;

import com.elearningportal.apps.domain.UserSignUpByReferralCode;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserSignUpByReferralCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSignUpByReferralCodeRepository extends JpaRepository<UserSignUpByReferralCode, Long> {

}

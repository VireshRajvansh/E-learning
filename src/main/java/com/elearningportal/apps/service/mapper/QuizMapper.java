package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.QuizDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Quiz and its DTO QuizDTO.
 */
@Mapper(componentModel = "spring", uses = {QuizAnsMapper.class, UserMapper.class})
public interface QuizMapper extends EntityMapper<QuizDTO, Quiz> {

    @Mapping(source = "quizAns.id", target = "quizAnsId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    QuizDTO toDto(Quiz quiz);

    @Mapping(source = "quizAnsId", target = "quizAns")
    @Mapping(source = "userId", target = "user")
    Quiz toEntity(QuizDTO quizDTO);

    default Quiz fromId(Long id) {
        if (id == null) {
            return null;
        }
        Quiz quiz = new Quiz();
        quiz.setId(id);
        return quiz;
    }
}

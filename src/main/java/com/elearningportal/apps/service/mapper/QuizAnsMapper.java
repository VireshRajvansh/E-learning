package com.elearningportal.apps.service.mapper;

import com.elearningportal.apps.domain.*;
import com.elearningportal.apps.service.dto.QuizAnsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity QuizAns and its DTO QuizAnsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface QuizAnsMapper extends EntityMapper<QuizAnsDTO, QuizAns> {


    @Mapping(target = "quiz", ignore = true)
    QuizAns toEntity(QuizAnsDTO quizAnsDTO);

    default QuizAns fromId(Long id) {
        if (id == null) {
            return null;
        }
        QuizAns quizAns = new QuizAns();
        quizAns.setId(id);
        return quizAns;
    }
}

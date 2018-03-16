import { BaseEntity } from './../../shared';

export class QuizAnsManage implements BaseEntity {
    constructor(
        public id?: number,
        public answers?: string,
        public quizId?: number,
    ) {
    }
}

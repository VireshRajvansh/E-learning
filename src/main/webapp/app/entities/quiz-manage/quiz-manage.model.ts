import { BaseEntity } from './../../shared';

export class QuizManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public text?: string,
        public type?: string,
        public shortDesc?: string,
        public isComplete?: boolean,
        public tagLine?: string,
        public active?: boolean,
        public selected?: boolean,
        public quizAnsId?: number,
        public userId?: number,
    ) {
        this.isComplete = false;
        this.active = false;
        this.selected = false;
    }
}

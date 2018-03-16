import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuizManage } from './quiz-manage.model';
import { QuizManageService } from './quiz-manage.service';

@Component({
    selector: 'jhi-quiz-manage-detail',
    templateUrl: './quiz-manage-detail.component.html'
})
export class QuizManageDetailComponent implements OnInit, OnDestroy {

    quiz: QuizManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quizService: QuizManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuizzes();
    }

    load(id) {
        this.quizService.find(id).subscribe((quiz) => {
            this.quiz = quiz;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuizzes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quizListModification',
            (response) => this.load(this.quiz.id)
        );
    }
}

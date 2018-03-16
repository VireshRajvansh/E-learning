import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuizAnsManage } from './quiz-ans-manage.model';
import { QuizAnsManageService } from './quiz-ans-manage.service';

@Component({
    selector: 'jhi-quiz-ans-manage-detail',
    templateUrl: './quiz-ans-manage-detail.component.html'
})
export class QuizAnsManageDetailComponent implements OnInit, OnDestroy {

    quizAns: QuizAnsManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quizAnsService: QuizAnsManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuizAns();
    }

    load(id) {
        this.quizAnsService.find(id).subscribe((quizAns) => {
            this.quizAns = quizAns;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuizAns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quizAnsListModification',
            (response) => this.load(this.quizAns.id)
        );
    }
}

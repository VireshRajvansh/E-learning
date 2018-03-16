import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { QuizManage } from './quiz-manage.model';
import { QuizManagePopupService } from './quiz-manage-popup.service';
import { QuizManageService } from './quiz-manage.service';
import { QuizAnsManage, QuizAnsManageService } from '../quiz-ans-manage';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-quiz-manage-dialog',
    templateUrl: './quiz-manage-dialog.component.html'
})
export class QuizManageDialogComponent implements OnInit {

    quiz: QuizManage;
    isSaving: boolean;

    quizans: QuizAnsManage[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private quizService: QuizManageService,
        private quizAnsService: QuizAnsManageService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.quizAnsService
            .query({filter: 'quiz-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.quiz.quizAnsId) {
                    this.quizans = res.json;
                } else {
                    this.quizAnsService
                        .find(this.quiz.quizAnsId)
                        .subscribe((subRes: QuizAnsManage) => {
                            this.quizans = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.quiz.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quizService.update(this.quiz));
        } else {
            this.subscribeToSaveResponse(
                this.quizService.create(this.quiz));
        }
    }

    private subscribeToSaveResponse(result: Observable<QuizManage>) {
        result.subscribe((res: QuizManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: QuizManage) {
        this.eventManager.broadcast({ name: 'quizListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackQuizAnsById(index: number, item: QuizAnsManage) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-quiz-manage-popup',
    template: ''
})
export class QuizManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quizPopupService: QuizManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quizPopupService
                    .open(QuizManageDialogComponent as Component, params['id']);
            } else {
                this.quizPopupService
                    .open(QuizManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

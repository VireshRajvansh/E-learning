import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { QuizAnsManage } from './quiz-ans-manage.model';
import { QuizAnsManagePopupService } from './quiz-ans-manage-popup.service';
import { QuizAnsManageService } from './quiz-ans-manage.service';
import { QuizManage, QuizManageService } from '../quiz-manage';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-quiz-ans-manage-dialog',
    templateUrl: './quiz-ans-manage-dialog.component.html'
})
export class QuizAnsManageDialogComponent implements OnInit {

    quizAns: QuizAnsManage;
    isSaving: boolean;

    quizzes: QuizManage[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private quizAnsService: QuizAnsManageService,
        private quizService: QuizManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.quizService.query()
            .subscribe((res: ResponseWrapper) => { this.quizzes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.quizAns.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quizAnsService.update(this.quizAns));
        } else {
            this.subscribeToSaveResponse(
                this.quizAnsService.create(this.quizAns));
        }
    }

    private subscribeToSaveResponse(result: Observable<QuizAnsManage>) {
        result.subscribe((res: QuizAnsManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: QuizAnsManage) {
        this.eventManager.broadcast({ name: 'quizAnsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackQuizById(index: number, item: QuizManage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-quiz-ans-manage-popup',
    template: ''
})
export class QuizAnsManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quizAnsPopupService: QuizAnsManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quizAnsPopupService
                    .open(QuizAnsManageDialogComponent as Component, params['id']);
            } else {
                this.quizAnsPopupService
                    .open(QuizAnsManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

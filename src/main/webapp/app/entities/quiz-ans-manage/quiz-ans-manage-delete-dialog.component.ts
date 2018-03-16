import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuizAnsManage } from './quiz-ans-manage.model';
import { QuizAnsManagePopupService } from './quiz-ans-manage-popup.service';
import { QuizAnsManageService } from './quiz-ans-manage.service';

@Component({
    selector: 'jhi-quiz-ans-manage-delete-dialog',
    templateUrl: './quiz-ans-manage-delete-dialog.component.html'
})
export class QuizAnsManageDeleteDialogComponent {

    quizAns: QuizAnsManage;

    constructor(
        private quizAnsService: QuizAnsManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quizAnsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quizAnsListModification',
                content: 'Deleted an quizAns'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quiz-ans-manage-delete-popup',
    template: ''
})
export class QuizAnsManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quizAnsPopupService: QuizAnsManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quizAnsPopupService
                .open(QuizAnsManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

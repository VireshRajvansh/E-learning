import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuizManage } from './quiz-manage.model';
import { QuizManagePopupService } from './quiz-manage-popup.service';
import { QuizManageService } from './quiz-manage.service';

@Component({
    selector: 'jhi-quiz-manage-delete-dialog',
    templateUrl: './quiz-manage-delete-dialog.component.html'
})
export class QuizManageDeleteDialogComponent {

    quiz: QuizManage;

    constructor(
        private quizService: QuizManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quizService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quizListModification',
                content: 'Deleted an quiz'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quiz-manage-delete-popup',
    template: ''
})
export class QuizManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quizPopupService: QuizManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quizPopupService
                .open(QuizManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

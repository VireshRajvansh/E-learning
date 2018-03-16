import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EducationManage } from './education-manage.model';
import { EducationManagePopupService } from './education-manage-popup.service';
import { EducationManageService } from './education-manage.service';

@Component({
    selector: 'jhi-education-manage-dialog',
    templateUrl: './education-manage-dialog.component.html'
})
export class EducationManageDialogComponent implements OnInit {

    education: EducationManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private educationService: EducationManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.education.id !== undefined) {
            this.subscribeToSaveResponse(
                this.educationService.update(this.education));
        } else {
            this.subscribeToSaveResponse(
                this.educationService.create(this.education));
        }
    }

    private subscribeToSaveResponse(result: Observable<EducationManage>) {
        result.subscribe((res: EducationManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EducationManage) {
        this.eventManager.broadcast({ name: 'educationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-education-manage-popup',
    template: ''
})
export class EducationManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationPopupService: EducationManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.educationPopupService
                    .open(EducationManageDialogComponent as Component, params['id']);
            } else {
                this.educationPopupService
                    .open(EducationManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

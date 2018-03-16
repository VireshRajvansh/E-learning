import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EducationCollegeManage } from './education-college-manage.model';
import { EducationCollegeManagePopupService } from './education-college-manage-popup.service';
import { EducationCollegeManageService } from './education-college-manage.service';

@Component({
    selector: 'jhi-education-college-manage-dialog',
    templateUrl: './education-college-manage-dialog.component.html'
})
export class EducationCollegeManageDialogComponent implements OnInit {

    educationCollege: EducationCollegeManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private educationCollegeService: EducationCollegeManageService,
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
        if (this.educationCollege.id !== undefined) {
            this.subscribeToSaveResponse(
                this.educationCollegeService.update(this.educationCollege));
        } else {
            this.subscribeToSaveResponse(
                this.educationCollegeService.create(this.educationCollege));
        }
    }

    private subscribeToSaveResponse(result: Observable<EducationCollegeManage>) {
        result.subscribe((res: EducationCollegeManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EducationCollegeManage) {
        this.eventManager.broadcast({ name: 'educationCollegeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-education-college-manage-popup',
    template: ''
})
export class EducationCollegeManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationCollegePopupService: EducationCollegeManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.educationCollegePopupService
                    .open(EducationCollegeManageDialogComponent as Component, params['id']);
            } else {
                this.educationCollegePopupService
                    .open(EducationCollegeManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

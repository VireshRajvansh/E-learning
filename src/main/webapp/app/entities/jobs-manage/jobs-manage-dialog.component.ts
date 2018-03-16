import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobsManage } from './jobs-manage.model';
import { JobsManagePopupService } from './jobs-manage-popup.service';
import { JobsManageService } from './jobs-manage.service';

@Component({
    selector: 'jhi-jobs-manage-dialog',
    templateUrl: './jobs-manage-dialog.component.html'
})
export class JobsManageDialogComponent implements OnInit {

    jobs: JobsManage;
    isSaving: boolean;
    runonDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jobsService: JobsManageService,
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
        if (this.jobs.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobsService.update(this.jobs));
        } else {
            this.subscribeToSaveResponse(
                this.jobsService.create(this.jobs));
        }
    }

    private subscribeToSaveResponse(result: Observable<JobsManage>) {
        result.subscribe((res: JobsManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: JobsManage) {
        this.eventManager.broadcast({ name: 'jobsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-jobs-manage-popup',
    template: ''
})
export class JobsManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobsPopupService: JobsManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobsPopupService
                    .open(JobsManageDialogComponent as Component, params['id']);
            } else {
                this.jobsPopupService
                    .open(JobsManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

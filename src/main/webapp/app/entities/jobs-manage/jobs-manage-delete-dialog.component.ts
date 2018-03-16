import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobsManage } from './jobs-manage.model';
import { JobsManagePopupService } from './jobs-manage-popup.service';
import { JobsManageService } from './jobs-manage.service';

@Component({
    selector: 'jhi-jobs-manage-delete-dialog',
    templateUrl: './jobs-manage-delete-dialog.component.html'
})
export class JobsManageDeleteDialogComponent {

    jobs: JobsManage;

    constructor(
        private jobsService: JobsManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobsListModification',
                content: 'Deleted an jobs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jobs-manage-delete-popup',
    template: ''
})
export class JobsManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobsPopupService: JobsManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobsPopupService
                .open(JobsManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

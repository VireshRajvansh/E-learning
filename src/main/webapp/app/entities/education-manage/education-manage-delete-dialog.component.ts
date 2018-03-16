import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EducationManage } from './education-manage.model';
import { EducationManagePopupService } from './education-manage-popup.service';
import { EducationManageService } from './education-manage.service';

@Component({
    selector: 'jhi-education-manage-delete-dialog',
    templateUrl: './education-manage-delete-dialog.component.html'
})
export class EducationManageDeleteDialogComponent {

    education: EducationManage;

    constructor(
        private educationService: EducationManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.educationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'educationListModification',
                content: 'Deleted an education'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-education-manage-delete-popup',
    template: ''
})
export class EducationManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationPopupService: EducationManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.educationPopupService
                .open(EducationManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

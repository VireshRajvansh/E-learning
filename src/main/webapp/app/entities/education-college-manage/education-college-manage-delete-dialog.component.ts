import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EducationCollegeManage } from './education-college-manage.model';
import { EducationCollegeManagePopupService } from './education-college-manage-popup.service';
import { EducationCollegeManageService } from './education-college-manage.service';

@Component({
    selector: 'jhi-education-college-manage-delete-dialog',
    templateUrl: './education-college-manage-delete-dialog.component.html'
})
export class EducationCollegeManageDeleteDialogComponent {

    educationCollege: EducationCollegeManage;

    constructor(
        private educationCollegeService: EducationCollegeManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.educationCollegeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'educationCollegeListModification',
                content: 'Deleted an educationCollege'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-education-college-manage-delete-popup',
    template: ''
})
export class EducationCollegeManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationCollegePopupService: EducationCollegeManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.educationCollegePopupService
                .open(EducationCollegeManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

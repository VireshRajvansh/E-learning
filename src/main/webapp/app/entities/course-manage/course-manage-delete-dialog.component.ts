import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CourseManage } from './course-manage.model';
import { CourseManagePopupService } from './course-manage-popup.service';
import { CourseManageService } from './course-manage.service';

@Component({
    selector: 'jhi-course-manage-delete-dialog',
    templateUrl: './course-manage-delete-dialog.component.html'
})
export class CourseManageDeleteDialogComponent {

    course: CourseManage;

    constructor(
        private courseService: CourseManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.courseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'courseListModification',
                content: 'Deleted an course'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-course-manage-delete-popup',
    template: ''
})
export class CourseManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursePopupService: CourseManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.coursePopupService
                .open(CourseManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

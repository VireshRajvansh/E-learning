import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TeacherManage } from './teacher-manage.model';
import { TeacherManagePopupService } from './teacher-manage-popup.service';
import { TeacherManageService } from './teacher-manage.service';

@Component({
    selector: 'jhi-teacher-manage-delete-dialog',
    templateUrl: './teacher-manage-delete-dialog.component.html'
})
export class TeacherManageDeleteDialogComponent {

    teacher: TeacherManage;

    constructor(
        private teacherService: TeacherManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teacherService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'teacherListModification',
                content: 'Deleted an teacher'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teacher-manage-delete-popup',
    template: ''
})
export class TeacherManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.teacherPopupService
                .open(TeacherManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

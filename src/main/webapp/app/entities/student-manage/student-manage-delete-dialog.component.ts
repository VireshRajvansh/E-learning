import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StudentManage } from './student-manage.model';
import { StudentManagePopupService } from './student-manage-popup.service';
import { StudentManageService } from './student-manage.service';

@Component({
    selector: 'jhi-student-manage-delete-dialog',
    templateUrl: './student-manage-delete-dialog.component.html'
})
export class StudentManageDeleteDialogComponent {

    student: StudentManage;

    constructor(
        private studentService: StudentManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'studentListModification',
                content: 'Deleted an student'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-manage-delete-popup',
    template: ''
})
export class StudentManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.studentPopupService
                .open(StudentManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StudentManage } from './student-manage.model';
import { StudentManageService } from './student-manage.service';

@Component({
    selector: 'jhi-student-manage-detail',
    templateUrl: './student-manage-detail.component.html'
})
export class StudentManageDetailComponent implements OnInit, OnDestroy {

    student: StudentManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private studentService: StudentManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStudents();
    }

    load(id) {
        this.studentService.find(id).subscribe((student) => {
            this.student = student;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'studentListModification',
            (response) => this.load(this.student.id)
        );
    }
}

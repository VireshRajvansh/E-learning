import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TeacherManage } from './teacher-manage.model';
import { TeacherManageService } from './teacher-manage.service';

@Component({
    selector: 'jhi-teacher-manage-detail',
    templateUrl: './teacher-manage-detail.component.html'
})
export class TeacherManageDetailComponent implements OnInit, OnDestroy {

    teacher: TeacherManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teacherService: TeacherManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeachers();
    }

    load(id) {
        this.teacherService.find(id).subscribe((teacher) => {
            this.teacher = teacher;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeachers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'teacherListModification',
            (response) => this.load(this.teacher.id)
        );
    }
}

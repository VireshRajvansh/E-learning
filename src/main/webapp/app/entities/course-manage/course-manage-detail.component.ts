import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CourseManage } from './course-manage.model';
import { CourseManageService } from './course-manage.service';

@Component({
    selector: 'jhi-course-manage-detail',
    templateUrl: './course-manage-detail.component.html'
})
export class CourseManageDetailComponent implements OnInit, OnDestroy {

    course: CourseManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private courseService: CourseManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCourses();
    }

    load(id) {
        this.courseService.find(id).subscribe((course) => {
            this.course = course;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCourses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'courseListModification',
            (response) => this.load(this.course.id)
        );
    }
}

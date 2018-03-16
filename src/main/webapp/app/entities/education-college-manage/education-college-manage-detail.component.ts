import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EducationCollegeManage } from './education-college-manage.model';
import { EducationCollegeManageService } from './education-college-manage.service';

@Component({
    selector: 'jhi-education-college-manage-detail',
    templateUrl: './education-college-manage-detail.component.html'
})
export class EducationCollegeManageDetailComponent implements OnInit, OnDestroy {

    educationCollege: EducationCollegeManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private educationCollegeService: EducationCollegeManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEducationColleges();
    }

    load(id) {
        this.educationCollegeService.find(id).subscribe((educationCollege) => {
            this.educationCollege = educationCollege;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEducationColleges() {
        this.eventSubscriber = this.eventManager.subscribe(
            'educationCollegeListModification',
            (response) => this.load(this.educationCollege.id)
        );
    }
}

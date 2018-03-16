import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EducationManage } from './education-manage.model';
import { EducationManageService } from './education-manage.service';

@Component({
    selector: 'jhi-education-manage-detail',
    templateUrl: './education-manage-detail.component.html'
})
export class EducationManageDetailComponent implements OnInit, OnDestroy {

    education: EducationManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private educationService: EducationManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEducations();
    }

    load(id) {
        this.educationService.find(id).subscribe((education) => {
            this.education = education;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEducations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'educationListModification',
            (response) => this.load(this.education.id)
        );
    }
}

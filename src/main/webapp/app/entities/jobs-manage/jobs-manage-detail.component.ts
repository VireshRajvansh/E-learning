import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobsManage } from './jobs-manage.model';
import { JobsManageService } from './jobs-manage.service';

@Component({
    selector: 'jhi-jobs-manage-detail',
    templateUrl: './jobs-manage-detail.component.html'
})
export class JobsManageDetailComponent implements OnInit, OnDestroy {

    jobs: JobsManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobsService: JobsManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobs();
    }

    load(id) {
        this.jobsService.find(id).subscribe((jobs) => {
            this.jobs = jobs;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobsListModification',
            (response) => this.load(this.jobs.id)
        );
    }
}

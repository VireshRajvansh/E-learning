import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServicesManage } from './services-manage.model';
import { ServicesManageService } from './services-manage.service';

@Component({
    selector: 'jhi-services-manage-detail',
    templateUrl: './services-manage-detail.component.html'
})
export class ServicesManageDetailComponent implements OnInit, OnDestroy {

    services: ServicesManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private servicesService: ServicesManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServices();
    }

    load(id) {
        this.servicesService.find(id).subscribe((services) => {
            this.services = services;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'servicesListModification',
            (response) => this.load(this.services.id)
        );
    }
}

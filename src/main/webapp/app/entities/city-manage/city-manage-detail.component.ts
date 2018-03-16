import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CityManage } from './city-manage.model';
import { CityManageService } from './city-manage.service';

@Component({
    selector: 'jhi-city-manage-detail',
    templateUrl: './city-manage-detail.component.html'
})
export class CityManageDetailComponent implements OnInit, OnDestroy {

    city: CityManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cityService: CityManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCities();
    }

    load(id) {
        this.cityService.find(id).subscribe((city) => {
            this.city = city;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cityListModification',
            (response) => this.load(this.city.id)
        );
    }
}

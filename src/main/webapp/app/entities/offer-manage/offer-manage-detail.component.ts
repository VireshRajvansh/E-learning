import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OfferManage } from './offer-manage.model';
import { OfferManageService } from './offer-manage.service';

@Component({
    selector: 'jhi-offer-manage-detail',
    templateUrl: './offer-manage-detail.component.html'
})
export class OfferManageDetailComponent implements OnInit, OnDestroy {

    offer: OfferManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private offerService: OfferManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOffers();
    }

    load(id) {
        this.offerService.find(id).subscribe((offer) => {
            this.offer = offer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOffers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'offerListModification',
            (response) => this.load(this.offer.id)
        );
    }
}

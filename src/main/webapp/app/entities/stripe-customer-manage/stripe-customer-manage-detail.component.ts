import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StripeCustomerManage } from './stripe-customer-manage.model';
import { StripeCustomerManageService } from './stripe-customer-manage.service';

@Component({
    selector: 'jhi-stripe-customer-manage-detail',
    templateUrl: './stripe-customer-manage-detail.component.html'
})
export class StripeCustomerManageDetailComponent implements OnInit, OnDestroy {

    stripeCustomer: StripeCustomerManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stripeCustomerService: StripeCustomerManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStripeCustomers();
    }

    load(id) {
        this.stripeCustomerService.find(id).subscribe((stripeCustomer) => {
            this.stripeCustomer = stripeCustomer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStripeCustomers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stripeCustomerListModification',
            (response) => this.load(this.stripeCustomer.id)
        );
    }
}

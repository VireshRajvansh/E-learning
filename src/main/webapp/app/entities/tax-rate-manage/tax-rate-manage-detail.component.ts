import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TaxRateManage } from './tax-rate-manage.model';
import { TaxRateManageService } from './tax-rate-manage.service';

@Component({
    selector: 'jhi-tax-rate-manage-detail',
    templateUrl: './tax-rate-manage-detail.component.html'
})
export class TaxRateManageDetailComponent implements OnInit, OnDestroy {

    taxRate: TaxRateManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private taxRateService: TaxRateManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTaxRates();
    }

    load(id) {
        this.taxRateService.find(id).subscribe((taxRate) => {
            this.taxRate = taxRate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTaxRates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taxRateListModification',
            (response) => this.load(this.taxRate.id)
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TaxRateManage } from './tax-rate-manage.model';
import { TaxRateManagePopupService } from './tax-rate-manage-popup.service';
import { TaxRateManageService } from './tax-rate-manage.service';

@Component({
    selector: 'jhi-tax-rate-manage-dialog',
    templateUrl: './tax-rate-manage-dialog.component.html'
})
export class TaxRateManageDialogComponent implements OnInit {

    taxRate: TaxRateManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private taxRateService: TaxRateManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.taxRate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taxRateService.update(this.taxRate));
        } else {
            this.subscribeToSaveResponse(
                this.taxRateService.create(this.taxRate));
        }
    }

    private subscribeToSaveResponse(result: Observable<TaxRateManage>) {
        result.subscribe((res: TaxRateManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TaxRateManage) {
        this.eventManager.broadcast({ name: 'taxRateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tax-rate-manage-popup',
    template: ''
})
export class TaxRateManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxRatePopupService: TaxRateManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taxRatePopupService
                    .open(TaxRateManageDialogComponent as Component, params['id']);
            } else {
                this.taxRatePopupService
                    .open(TaxRateManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

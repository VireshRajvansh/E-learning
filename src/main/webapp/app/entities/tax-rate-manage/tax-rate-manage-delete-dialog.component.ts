import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TaxRateManage } from './tax-rate-manage.model';
import { TaxRateManagePopupService } from './tax-rate-manage-popup.service';
import { TaxRateManageService } from './tax-rate-manage.service';

@Component({
    selector: 'jhi-tax-rate-manage-delete-dialog',
    templateUrl: './tax-rate-manage-delete-dialog.component.html'
})
export class TaxRateManageDeleteDialogComponent {

    taxRate: TaxRateManage;

    constructor(
        private taxRateService: TaxRateManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taxRateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'taxRateListModification',
                content: 'Deleted an taxRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tax-rate-manage-delete-popup',
    template: ''
})
export class TaxRateManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxRatePopupService: TaxRateManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.taxRatePopupService
                .open(TaxRateManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

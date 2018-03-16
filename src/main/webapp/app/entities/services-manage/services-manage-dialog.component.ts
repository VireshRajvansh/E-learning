import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServicesManage } from './services-manage.model';
import { ServicesManagePopupService } from './services-manage-popup.service';
import { ServicesManageService } from './services-manage.service';

@Component({
    selector: 'jhi-services-manage-dialog',
    templateUrl: './services-manage-dialog.component.html'
})
export class ServicesManageDialogComponent implements OnInit {

    services: ServicesManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private servicesService: ServicesManageService,
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
        if (this.services.id !== undefined) {
            this.subscribeToSaveResponse(
                this.servicesService.update(this.services));
        } else {
            this.subscribeToSaveResponse(
                this.servicesService.create(this.services));
        }
    }

    private subscribeToSaveResponse(result: Observable<ServicesManage>) {
        result.subscribe((res: ServicesManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ServicesManage) {
        this.eventManager.broadcast({ name: 'servicesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-services-manage-popup',
    template: ''
})
export class ServicesManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicesPopupService: ServicesManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servicesPopupService
                    .open(ServicesManageDialogComponent as Component, params['id']);
            } else {
                this.servicesPopupService
                    .open(ServicesManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

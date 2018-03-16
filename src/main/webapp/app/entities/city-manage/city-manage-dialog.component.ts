import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CityManage } from './city-manage.model';
import { CityManagePopupService } from './city-manage-popup.service';
import { CityManageService } from './city-manage.service';
import { StateManage, StateManageService } from '../state-manage';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-city-manage-dialog',
    templateUrl: './city-manage-dialog.component.html'
})
export class CityManageDialogComponent implements OnInit {

    city: CityManage;
    isSaving: boolean;

    states: StateManage[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cityService: CityManageService,
        private stateService: StateManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stateService.query()
            .subscribe((res: ResponseWrapper) => { this.states = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cityService.update(this.city));
        } else {
            this.subscribeToSaveResponse(
                this.cityService.create(this.city));
        }
    }

    private subscribeToSaveResponse(result: Observable<CityManage>) {
        result.subscribe((res: CityManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CityManage) {
        this.eventManager.broadcast({ name: 'cityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStateById(index: number, item: StateManage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-city-manage-popup',
    template: ''
})
export class CityManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityPopupService: CityManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cityPopupService
                    .open(CityManageDialogComponent as Component, params['id']);
            } else {
                this.cityPopupService
                    .open(CityManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

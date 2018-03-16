import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StateManage } from './state-manage.model';
import { StateManagePopupService } from './state-manage-popup.service';
import { StateManageService } from './state-manage.service';

@Component({
    selector: 'jhi-state-manage-dialog',
    templateUrl: './state-manage-dialog.component.html'
})
export class StateManageDialogComponent implements OnInit {

    state: StateManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private stateService: StateManageService,
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
        if (this.state.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stateService.update(this.state));
        } else {
            this.subscribeToSaveResponse(
                this.stateService.create(this.state));
        }
    }

    private subscribeToSaveResponse(result: Observable<StateManage>) {
        result.subscribe((res: StateManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: StateManage) {
        this.eventManager.broadcast({ name: 'stateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-state-manage-popup',
    template: ''
})
export class StateManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statePopupService: StateManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.statePopupService
                    .open(StateManageDialogComponent as Component, params['id']);
            } else {
                this.statePopupService
                    .open(StateManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

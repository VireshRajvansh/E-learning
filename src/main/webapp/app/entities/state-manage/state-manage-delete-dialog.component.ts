import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StateManage } from './state-manage.model';
import { StateManagePopupService } from './state-manage-popup.service';
import { StateManageService } from './state-manage.service';

@Component({
    selector: 'jhi-state-manage-delete-dialog',
    templateUrl: './state-manage-delete-dialog.component.html'
})
export class StateManageDeleteDialogComponent {

    state: StateManage;

    constructor(
        private stateService: StateManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stateListModification',
                content: 'Deleted an state'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-state-manage-delete-popup',
    template: ''
})
export class StateManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statePopupService: StateManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.statePopupService
                .open(StateManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

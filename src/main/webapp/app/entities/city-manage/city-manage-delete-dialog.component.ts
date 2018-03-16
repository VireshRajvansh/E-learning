import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CityManage } from './city-manage.model';
import { CityManagePopupService } from './city-manage-popup.service';
import { CityManageService } from './city-manage.service';

@Component({
    selector: 'jhi-city-manage-delete-dialog',
    templateUrl: './city-manage-delete-dialog.component.html'
})
export class CityManageDeleteDialogComponent {

    city: CityManage;

    constructor(
        private cityService: CityManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cityListModification',
                content: 'Deleted an city'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-city-manage-delete-popup',
    template: ''
})
export class CityManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityPopupService: CityManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cityPopupService
                .open(CityManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

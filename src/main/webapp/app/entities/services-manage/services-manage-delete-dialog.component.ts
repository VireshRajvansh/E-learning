import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServicesManage } from './services-manage.model';
import { ServicesManagePopupService } from './services-manage-popup.service';
import { ServicesManageService } from './services-manage.service';

@Component({
    selector: 'jhi-services-manage-delete-dialog',
    templateUrl: './services-manage-delete-dialog.component.html'
})
export class ServicesManageDeleteDialogComponent {

    services: ServicesManage;

    constructor(
        private servicesService: ServicesManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.servicesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'servicesListModification',
                content: 'Deleted an services'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-services-manage-delete-popup',
    template: ''
})
export class ServicesManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicesPopupService: ServicesManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.servicesPopupService
                .open(ServicesManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

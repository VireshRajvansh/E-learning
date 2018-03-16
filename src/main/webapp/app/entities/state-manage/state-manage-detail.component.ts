import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StateManage } from './state-manage.model';
import { StateManageService } from './state-manage.service';

@Component({
    selector: 'jhi-state-manage-detail',
    templateUrl: './state-manage-detail.component.html'
})
export class StateManageDetailComponent implements OnInit, OnDestroy {

    state: StateManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stateService: StateManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStates();
    }

    load(id) {
        this.stateService.find(id).subscribe((state) => {
            this.state = state;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stateListModification',
            (response) => this.load(this.state.id)
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PlayListManage } from './play-list-manage.model';
import { PlayListManageService } from './play-list-manage.service';

@Component({
    selector: 'jhi-play-list-manage-detail',
    templateUrl: './play-list-manage-detail.component.html'
})
export class PlayListManageDetailComponent implements OnInit, OnDestroy {

    playList: PlayListManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private playListService: PlayListManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlayLists();
    }

    load(id) {
        this.playListService.find(id).subscribe((playList) => {
            this.playList = playList;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlayLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playListListModification',
            (response) => this.load(this.playList.id)
        );
    }
}

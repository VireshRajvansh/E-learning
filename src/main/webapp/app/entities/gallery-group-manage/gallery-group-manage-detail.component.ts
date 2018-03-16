import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GalleryGroupManage } from './gallery-group-manage.model';
import { GalleryGroupManageService } from './gallery-group-manage.service';

@Component({
    selector: 'jhi-gallery-group-manage-detail',
    templateUrl: './gallery-group-manage-detail.component.html'
})
export class GalleryGroupManageDetailComponent implements OnInit, OnDestroy {

    galleryGroup: GalleryGroupManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private galleryGroupService: GalleryGroupManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGalleryGroups();
    }

    load(id) {
        this.galleryGroupService.find(id).subscribe((galleryGroup) => {
            this.galleryGroup = galleryGroup;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGalleryGroups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'galleryGroupListModification',
            (response) => this.load(this.galleryGroup.id)
        );
    }
}

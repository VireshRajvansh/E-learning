import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GalleryManage } from './gallery-manage.model';
import { GalleryManageService } from './gallery-manage.service';

@Component({
    selector: 'jhi-gallery-manage-detail',
    templateUrl: './gallery-manage-detail.component.html'
})
export class GalleryManageDetailComponent implements OnInit, OnDestroy {

    gallery: GalleryManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private galleryService: GalleryManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGalleries();
    }

    load(id) {
        this.galleryService.find(id).subscribe((gallery) => {
            this.gallery = gallery;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGalleries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'galleryListModification',
            (response) => this.load(this.gallery.id)
        );
    }
}

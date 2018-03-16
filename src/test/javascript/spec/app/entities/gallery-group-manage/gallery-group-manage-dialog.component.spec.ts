/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { GalleryGroupManageDialogComponent } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage-dialog.component';
import { GalleryGroupManageService } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage.service';
import { GalleryGroupManage } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage.model';

describe('Component Tests', () => {

    describe('GalleryGroupManage Management Dialog Component', () => {
        let comp: GalleryGroupManageDialogComponent;
        let fixture: ComponentFixture<GalleryGroupManageDialogComponent>;
        let service: GalleryGroupManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryGroupManageDialogComponent],
                providers: [
                    GalleryGroupManageService
                ]
            })
            .overrideTemplate(GalleryGroupManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GalleryGroupManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryGroupManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GalleryGroupManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.galleryGroup = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'galleryGroupListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GalleryGroupManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.galleryGroup = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'galleryGroupListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

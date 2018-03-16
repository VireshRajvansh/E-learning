/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { GalleryManageDialogComponent } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage-dialog.component';
import { GalleryManageService } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage.service';
import { GalleryManage } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage.model';
import { GalleryGroupManageService } from '../../../../../../main/webapp/app/entities/gallery-group-manage';

describe('Component Tests', () => {

    describe('GalleryManage Management Dialog Component', () => {
        let comp: GalleryManageDialogComponent;
        let fixture: ComponentFixture<GalleryManageDialogComponent>;
        let service: GalleryManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryManageDialogComponent],
                providers: [
                    GalleryGroupManageService,
                    GalleryManageService
                ]
            })
            .overrideTemplate(GalleryManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GalleryManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GalleryManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.gallery = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'galleryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GalleryManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.gallery = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'galleryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

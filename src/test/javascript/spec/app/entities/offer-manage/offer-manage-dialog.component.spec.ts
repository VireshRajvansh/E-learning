/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { OfferManageDialogComponent } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage-dialog.component';
import { OfferManageService } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage.service';
import { OfferManage } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage.model';

describe('Component Tests', () => {

    describe('OfferManage Management Dialog Component', () => {
        let comp: OfferManageDialogComponent;
        let fixture: ComponentFixture<OfferManageDialogComponent>;
        let service: OfferManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [OfferManageDialogComponent],
                providers: [
                    OfferManageService
                ]
            })
            .overrideTemplate(OfferManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OfferManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.offer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'offerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OfferManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.offer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'offerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

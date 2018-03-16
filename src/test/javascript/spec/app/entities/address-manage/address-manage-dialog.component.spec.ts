/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { AddressManageDialogComponent } from '../../../../../../main/webapp/app/entities/address-manage/address-manage-dialog.component';
import { AddressManageService } from '../../../../../../main/webapp/app/entities/address-manage/address-manage.service';
import { AddressManage } from '../../../../../../main/webapp/app/entities/address-manage/address-manage.model';

describe('Component Tests', () => {

    describe('AddressManage Management Dialog Component', () => {
        let comp: AddressManageDialogComponent;
        let fixture: ComponentFixture<AddressManageDialogComponent>;
        let service: AddressManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [AddressManageDialogComponent],
                providers: [
                    AddressManageService
                ]
            })
            .overrideTemplate(AddressManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

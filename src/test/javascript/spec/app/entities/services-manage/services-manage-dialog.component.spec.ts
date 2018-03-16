/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { ServicesManageDialogComponent } from '../../../../../../main/webapp/app/entities/services-manage/services-manage-dialog.component';
import { ServicesManageService } from '../../../../../../main/webapp/app/entities/services-manage/services-manage.service';
import { ServicesManage } from '../../../../../../main/webapp/app/entities/services-manage/services-manage.model';

describe('Component Tests', () => {

    describe('ServicesManage Management Dialog Component', () => {
        let comp: ServicesManageDialogComponent;
        let fixture: ComponentFixture<ServicesManageDialogComponent>;
        let service: ServicesManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ServicesManageDialogComponent],
                providers: [
                    ServicesManageService
                ]
            })
            .overrideTemplate(ServicesManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServicesManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServicesManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.services = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'servicesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServicesManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.services = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'servicesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StateManageDialogComponent } from '../../../../../../main/webapp/app/entities/state-manage/state-manage-dialog.component';
import { StateManageService } from '../../../../../../main/webapp/app/entities/state-manage/state-manage.service';
import { StateManage } from '../../../../../../main/webapp/app/entities/state-manage/state-manage.model';

describe('Component Tests', () => {

    describe('StateManage Management Dialog Component', () => {
        let comp: StateManageDialogComponent;
        let fixture: ComponentFixture<StateManageDialogComponent>;
        let service: StateManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StateManageDialogComponent],
                providers: [
                    StateManageService
                ]
            })
            .overrideTemplate(StateManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StateManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.state = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StateManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.state = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

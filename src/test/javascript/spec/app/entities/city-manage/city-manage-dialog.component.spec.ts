/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { CityManageDialogComponent } from '../../../../../../main/webapp/app/entities/city-manage/city-manage-dialog.component';
import { CityManageService } from '../../../../../../main/webapp/app/entities/city-manage/city-manage.service';
import { CityManage } from '../../../../../../main/webapp/app/entities/city-manage/city-manage.model';
import { StateManageService } from '../../../../../../main/webapp/app/entities/state-manage';

describe('Component Tests', () => {

    describe('CityManage Management Dialog Component', () => {
        let comp: CityManageDialogComponent;
        let fixture: ComponentFixture<CityManageDialogComponent>;
        let service: CityManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CityManageDialogComponent],
                providers: [
                    StateManageService,
                    CityManageService
                ]
            })
            .overrideTemplate(CityManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CityManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.city = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CityManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.city = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

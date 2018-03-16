/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { TaxRateManageDialogComponent } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage-dialog.component';
import { TaxRateManageService } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.service';
import { TaxRateManage } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.model';

describe('Component Tests', () => {

    describe('TaxRateManage Management Dialog Component', () => {
        let comp: TaxRateManageDialogComponent;
        let fixture: ComponentFixture<TaxRateManageDialogComponent>;
        let service: TaxRateManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TaxRateManageDialogComponent],
                providers: [
                    TaxRateManageService
                ]
            })
            .overrideTemplate(TaxRateManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxRateManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxRateManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TaxRateManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.taxRate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'taxRateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TaxRateManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.taxRate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'taxRateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

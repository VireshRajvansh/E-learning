/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { TaxRateManageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage-delete-dialog.component';
import { TaxRateManageService } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.service';

describe('Component Tests', () => {

    describe('TaxRateManage Management Delete Component', () => {
        let comp: TaxRateManageDeleteDialogComponent;
        let fixture: ComponentFixture<TaxRateManageDeleteDialogComponent>;
        let service: TaxRateManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TaxRateManageDeleteDialogComponent],
                providers: [
                    TaxRateManageService
                ]
            })
            .overrideTemplate(TaxRateManageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxRateManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxRateManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

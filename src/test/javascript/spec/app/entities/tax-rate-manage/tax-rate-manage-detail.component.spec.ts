/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { TaxRateManageDetailComponent } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage-detail.component';
import { TaxRateManageService } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.service';
import { TaxRateManage } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.model';

describe('Component Tests', () => {

    describe('TaxRateManage Management Detail Component', () => {
        let comp: TaxRateManageDetailComponent;
        let fixture: ComponentFixture<TaxRateManageDetailComponent>;
        let service: TaxRateManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TaxRateManageDetailComponent],
                providers: [
                    TaxRateManageService
                ]
            })
            .overrideTemplate(TaxRateManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxRateManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxRateManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TaxRateManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.taxRate).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { TaxRateManageComponent } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.component';
import { TaxRateManageService } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.service';
import { TaxRateManage } from '../../../../../../main/webapp/app/entities/tax-rate-manage/tax-rate-manage.model';

describe('Component Tests', () => {

    describe('TaxRateManage Management Component', () => {
        let comp: TaxRateManageComponent;
        let fixture: ComponentFixture<TaxRateManageComponent>;
        let service: TaxRateManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TaxRateManageComponent],
                providers: [
                    TaxRateManageService
                ]
            })
            .overrideTemplate(TaxRateManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxRateManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxRateManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TaxRateManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.taxRates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

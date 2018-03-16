/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { StripeTransactionManageDetailComponent } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage-detail.component';
import { StripeTransactionManageService } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.service';
import { StripeTransactionManage } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.model';

describe('Component Tests', () => {

    describe('StripeTransactionManage Management Detail Component', () => {
        let comp: StripeTransactionManageDetailComponent;
        let fixture: ComponentFixture<StripeTransactionManageDetailComponent>;
        let service: StripeTransactionManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeTransactionManageDetailComponent],
                providers: [
                    StripeTransactionManageService
                ]
            })
            .overrideTemplate(StripeTransactionManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripeTransactionManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeTransactionManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new StripeTransactionManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stripeTransaction).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { StripePaymentManageDetailComponent } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage-detail.component';
import { StripePaymentManageService } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.service';
import { StripePaymentManage } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.model';

describe('Component Tests', () => {

    describe('StripePaymentManage Management Detail Component', () => {
        let comp: StripePaymentManageDetailComponent;
        let fixture: ComponentFixture<StripePaymentManageDetailComponent>;
        let service: StripePaymentManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripePaymentManageDetailComponent],
                providers: [
                    StripePaymentManageService
                ]
            })
            .overrideTemplate(StripePaymentManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripePaymentManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripePaymentManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new StripePaymentManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stripePayment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { StripePaymentManageComponent } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.component';
import { StripePaymentManageService } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.service';
import { StripePaymentManage } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.model';

describe('Component Tests', () => {

    describe('StripePaymentManage Management Component', () => {
        let comp: StripePaymentManageComponent;
        let fixture: ComponentFixture<StripePaymentManageComponent>;
        let service: StripePaymentManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripePaymentManageComponent],
                providers: [
                    StripePaymentManageService
                ]
            })
            .overrideTemplate(StripePaymentManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripePaymentManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripePaymentManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new StripePaymentManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stripePayments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

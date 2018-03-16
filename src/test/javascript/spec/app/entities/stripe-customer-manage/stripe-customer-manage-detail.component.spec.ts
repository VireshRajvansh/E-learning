/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { StripeCustomerManageDetailComponent } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage-detail.component';
import { StripeCustomerManageService } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage.service';
import { StripeCustomerManage } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage.model';

describe('Component Tests', () => {

    describe('StripeCustomerManage Management Detail Component', () => {
        let comp: StripeCustomerManageDetailComponent;
        let fixture: ComponentFixture<StripeCustomerManageDetailComponent>;
        let service: StripeCustomerManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeCustomerManageDetailComponent],
                providers: [
                    StripeCustomerManageService
                ]
            })
            .overrideTemplate(StripeCustomerManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripeCustomerManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeCustomerManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new StripeCustomerManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stripeCustomer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { UserSignUpByReferralCodeManageDetailComponent } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage-detail.component';
import { UserSignUpByReferralCodeManageService } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.service';
import { UserSignUpByReferralCodeManage } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.model';

describe('Component Tests', () => {

    describe('UserSignUpByReferralCodeManage Management Detail Component', () => {
        let comp: UserSignUpByReferralCodeManageDetailComponent;
        let fixture: ComponentFixture<UserSignUpByReferralCodeManageDetailComponent>;
        let service: UserSignUpByReferralCodeManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [UserSignUpByReferralCodeManageDetailComponent],
                providers: [
                    UserSignUpByReferralCodeManageService
                ]
            })
            .overrideTemplate(UserSignUpByReferralCodeManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSignUpByReferralCodeManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSignUpByReferralCodeManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new UserSignUpByReferralCodeManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userSignUpByReferralCode).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

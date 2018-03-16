/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { UserSignUpByReferralCodeManageComponent } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.component';
import { UserSignUpByReferralCodeManageService } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.service';
import { UserSignUpByReferralCodeManage } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.model';

describe('Component Tests', () => {

    describe('UserSignUpByReferralCodeManage Management Component', () => {
        let comp: UserSignUpByReferralCodeManageComponent;
        let fixture: ComponentFixture<UserSignUpByReferralCodeManageComponent>;
        let service: UserSignUpByReferralCodeManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [UserSignUpByReferralCodeManageComponent],
                providers: [
                    UserSignUpByReferralCodeManageService
                ]
            })
            .overrideTemplate(UserSignUpByReferralCodeManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSignUpByReferralCodeManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSignUpByReferralCodeManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new UserSignUpByReferralCodeManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userSignUpByReferralCodes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

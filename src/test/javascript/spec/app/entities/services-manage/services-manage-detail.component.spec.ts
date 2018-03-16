/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { ServicesManageDetailComponent } from '../../../../../../main/webapp/app/entities/services-manage/services-manage-detail.component';
import { ServicesManageService } from '../../../../../../main/webapp/app/entities/services-manage/services-manage.service';
import { ServicesManage } from '../../../../../../main/webapp/app/entities/services-manage/services-manage.model';

describe('Component Tests', () => {

    describe('ServicesManage Management Detail Component', () => {
        let comp: ServicesManageDetailComponent;
        let fixture: ComponentFixture<ServicesManageDetailComponent>;
        let service: ServicesManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ServicesManageDetailComponent],
                providers: [
                    ServicesManageService
                ]
            })
            .overrideTemplate(ServicesManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServicesManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ServicesManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.services).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

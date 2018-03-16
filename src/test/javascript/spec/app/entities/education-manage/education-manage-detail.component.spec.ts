/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { EducationManageDetailComponent } from '../../../../../../main/webapp/app/entities/education-manage/education-manage-detail.component';
import { EducationManageService } from '../../../../../../main/webapp/app/entities/education-manage/education-manage.service';
import { EducationManage } from '../../../../../../main/webapp/app/entities/education-manage/education-manage.model';

describe('Component Tests', () => {

    describe('EducationManage Management Detail Component', () => {
        let comp: EducationManageDetailComponent;
        let fixture: ComponentFixture<EducationManageDetailComponent>;
        let service: EducationManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationManageDetailComponent],
                providers: [
                    EducationManageService
                ]
            })
            .overrideTemplate(EducationManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EducationManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.education).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

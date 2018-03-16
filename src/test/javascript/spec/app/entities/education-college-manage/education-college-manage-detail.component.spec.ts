/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { EducationCollegeManageDetailComponent } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage-detail.component';
import { EducationCollegeManageService } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.service';
import { EducationCollegeManage } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.model';

describe('Component Tests', () => {

    describe('EducationCollegeManage Management Detail Component', () => {
        let comp: EducationCollegeManageDetailComponent;
        let fixture: ComponentFixture<EducationCollegeManageDetailComponent>;
        let service: EducationCollegeManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationCollegeManageDetailComponent],
                providers: [
                    EducationCollegeManageService
                ]
            })
            .overrideTemplate(EducationCollegeManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationCollegeManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationCollegeManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EducationCollegeManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.educationCollege).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

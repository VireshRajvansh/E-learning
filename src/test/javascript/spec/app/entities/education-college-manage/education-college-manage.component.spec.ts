/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { EducationCollegeManageComponent } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.component';
import { EducationCollegeManageService } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.service';
import { EducationCollegeManage } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.model';

describe('Component Tests', () => {

    describe('EducationCollegeManage Management Component', () => {
        let comp: EducationCollegeManageComponent;
        let fixture: ComponentFixture<EducationCollegeManageComponent>;
        let service: EducationCollegeManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationCollegeManageComponent],
                providers: [
                    EducationCollegeManageService
                ]
            })
            .overrideTemplate(EducationCollegeManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationCollegeManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationCollegeManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EducationCollegeManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.educationColleges[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

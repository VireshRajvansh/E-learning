/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { CourseManageDetailComponent } from '../../../../../../main/webapp/app/entities/course-manage/course-manage-detail.component';
import { CourseManageService } from '../../../../../../main/webapp/app/entities/course-manage/course-manage.service';
import { CourseManage } from '../../../../../../main/webapp/app/entities/course-manage/course-manage.model';

describe('Component Tests', () => {

    describe('CourseManage Management Detail Component', () => {
        let comp: CourseManageDetailComponent;
        let fixture: ComponentFixture<CourseManageDetailComponent>;
        let service: CourseManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CourseManageDetailComponent],
                providers: [
                    CourseManageService
                ]
            })
            .overrideTemplate(CourseManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CourseManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.course).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

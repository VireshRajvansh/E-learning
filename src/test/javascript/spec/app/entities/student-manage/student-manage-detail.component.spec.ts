/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { StudentManageDetailComponent } from '../../../../../../main/webapp/app/entities/student-manage/student-manage-detail.component';
import { StudentManageService } from '../../../../../../main/webapp/app/entities/student-manage/student-manage.service';
import { StudentManage } from '../../../../../../main/webapp/app/entities/student-manage/student-manage.model';

describe('Component Tests', () => {

    describe('StudentManage Management Detail Component', () => {
        let comp: StudentManageDetailComponent;
        let fixture: ComponentFixture<StudentManageDetailComponent>;
        let service: StudentManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StudentManageDetailComponent],
                providers: [
                    StudentManageService
                ]
            })
            .overrideTemplate(StudentManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new StudentManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.student).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

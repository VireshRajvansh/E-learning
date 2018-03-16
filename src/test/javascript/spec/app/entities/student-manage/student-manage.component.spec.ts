/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { StudentManageComponent } from '../../../../../../main/webapp/app/entities/student-manage/student-manage.component';
import { StudentManageService } from '../../../../../../main/webapp/app/entities/student-manage/student-manage.service';
import { StudentManage } from '../../../../../../main/webapp/app/entities/student-manage/student-manage.model';

describe('Component Tests', () => {

    describe('StudentManage Management Component', () => {
        let comp: StudentManageComponent;
        let fixture: ComponentFixture<StudentManageComponent>;
        let service: StudentManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StudentManageComponent],
                providers: [
                    StudentManageService
                ]
            })
            .overrideTemplate(StudentManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new StudentManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.students[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

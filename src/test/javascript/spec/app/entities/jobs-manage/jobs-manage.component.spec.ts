/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { JobsManageComponent } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage.component';
import { JobsManageService } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage.service';
import { JobsManage } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage.model';

describe('Component Tests', () => {

    describe('JobsManage Management Component', () => {
        let comp: JobsManageComponent;
        let fixture: ComponentFixture<JobsManageComponent>;
        let service: JobsManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [JobsManageComponent],
                providers: [
                    JobsManageService
                ]
            })
            .overrideTemplate(JobsManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobsManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobsManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new JobsManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { QuizManageComponent } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage.component';
import { QuizManageService } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage.service';
import { QuizManage } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage.model';

describe('Component Tests', () => {

    describe('QuizManage Management Component', () => {
        let comp: QuizManageComponent;
        let fixture: ComponentFixture<QuizManageComponent>;
        let service: QuizManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizManageComponent],
                providers: [
                    QuizManageService
                ]
            })
            .overrideTemplate(QuizManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuizManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new QuizManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.quizzes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

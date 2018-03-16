/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { QuizAnsManageComponent } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage.component';
import { QuizAnsManageService } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage.service';
import { QuizAnsManage } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage.model';

describe('Component Tests', () => {

    describe('QuizAnsManage Management Component', () => {
        let comp: QuizAnsManageComponent;
        let fixture: ComponentFixture<QuizAnsManageComponent>;
        let service: QuizAnsManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizAnsManageComponent],
                providers: [
                    QuizAnsManageService
                ]
            })
            .overrideTemplate(QuizAnsManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuizAnsManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizAnsManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new QuizAnsManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.quizAns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

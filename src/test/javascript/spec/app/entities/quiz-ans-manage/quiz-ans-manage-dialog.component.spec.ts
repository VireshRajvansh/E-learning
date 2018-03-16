/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { QuizAnsManageDialogComponent } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage-dialog.component';
import { QuizAnsManageService } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage.service';
import { QuizAnsManage } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage.model';
import { QuizManageService } from '../../../../../../main/webapp/app/entities/quiz-manage';

describe('Component Tests', () => {

    describe('QuizAnsManage Management Dialog Component', () => {
        let comp: QuizAnsManageDialogComponent;
        let fixture: ComponentFixture<QuizAnsManageDialogComponent>;
        let service: QuizAnsManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizAnsManageDialogComponent],
                providers: [
                    QuizManageService,
                    QuizAnsManageService
                ]
            })
            .overrideTemplate(QuizAnsManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuizAnsManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizAnsManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuizAnsManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.quizAns = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quizAnsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuizAnsManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.quizAns = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quizAnsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

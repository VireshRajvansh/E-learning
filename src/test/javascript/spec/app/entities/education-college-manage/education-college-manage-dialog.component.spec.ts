/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { EducationCollegeManageDialogComponent } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage-dialog.component';
import { EducationCollegeManageService } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.service';
import { EducationCollegeManage } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.model';

describe('Component Tests', () => {

    describe('EducationCollegeManage Management Dialog Component', () => {
        let comp: EducationCollegeManageDialogComponent;
        let fixture: ComponentFixture<EducationCollegeManageDialogComponent>;
        let service: EducationCollegeManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationCollegeManageDialogComponent],
                providers: [
                    EducationCollegeManageService
                ]
            })
            .overrideTemplate(EducationCollegeManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationCollegeManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationCollegeManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EducationCollegeManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.educationCollege = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'educationCollegeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EducationCollegeManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.educationCollege = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'educationCollegeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

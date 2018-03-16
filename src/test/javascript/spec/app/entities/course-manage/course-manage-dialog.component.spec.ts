/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { CourseManageDialogComponent } from '../../../../../../main/webapp/app/entities/course-manage/course-manage-dialog.component';
import { CourseManageService } from '../../../../../../main/webapp/app/entities/course-manage/course-manage.service';
import { CourseManage } from '../../../../../../main/webapp/app/entities/course-manage/course-manage.model';
import { PlayListManageService } from '../../../../../../main/webapp/app/entities/play-list-manage';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('CourseManage Management Dialog Component', () => {
        let comp: CourseManageDialogComponent;
        let fixture: ComponentFixture<CourseManageDialogComponent>;
        let service: CourseManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CourseManageDialogComponent],
                providers: [
                    PlayListManageService,
                    UserService,
                    CourseManageService
                ]
            })
            .overrideTemplate(CourseManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CourseManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.course = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'courseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CourseManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.course = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'courseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

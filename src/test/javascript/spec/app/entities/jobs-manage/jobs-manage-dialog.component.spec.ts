/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { JobsManageDialogComponent } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage-dialog.component';
import { JobsManageService } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage.service';
import { JobsManage } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage.model';

describe('Component Tests', () => {

    describe('JobsManage Management Dialog Component', () => {
        let comp: JobsManageDialogComponent;
        let fixture: ComponentFixture<JobsManageDialogComponent>;
        let service: JobsManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [JobsManageDialogComponent],
                providers: [
                    JobsManageService
                ]
            })
            .overrideTemplate(JobsManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobsManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobsManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JobsManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.jobs = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JobsManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.jobs = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

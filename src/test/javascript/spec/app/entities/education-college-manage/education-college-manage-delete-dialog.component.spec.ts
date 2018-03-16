/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { EducationCollegeManageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage-delete-dialog.component';
import { EducationCollegeManageService } from '../../../../../../main/webapp/app/entities/education-college-manage/education-college-manage.service';

describe('Component Tests', () => {

    describe('EducationCollegeManage Management Delete Component', () => {
        let comp: EducationCollegeManageDeleteDialogComponent;
        let fixture: ComponentFixture<EducationCollegeManageDeleteDialogComponent>;
        let service: EducationCollegeManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationCollegeManageDeleteDialogComponent],
                providers: [
                    EducationCollegeManageService
                ]
            })
            .overrideTemplate(EducationCollegeManageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationCollegeManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationCollegeManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

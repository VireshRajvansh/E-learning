/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { StateManageDetailComponent } from '../../../../../../main/webapp/app/entities/state-manage/state-manage-detail.component';
import { StateManageService } from '../../../../../../main/webapp/app/entities/state-manage/state-manage.service';
import { StateManage } from '../../../../../../main/webapp/app/entities/state-manage/state-manage.model';

describe('Component Tests', () => {

    describe('StateManage Management Detail Component', () => {
        let comp: StateManageDetailComponent;
        let fixture: ComponentFixture<StateManageDetailComponent>;
        let service: StateManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StateManageDetailComponent],
                providers: [
                    StateManageService
                ]
            })
            .overrideTemplate(StateManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new StateManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.state).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

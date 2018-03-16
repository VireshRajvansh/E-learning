/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { StateManageComponent } from '../../../../../../main/webapp/app/entities/state-manage/state-manage.component';
import { StateManageService } from '../../../../../../main/webapp/app/entities/state-manage/state-manage.service';
import { StateManage } from '../../../../../../main/webapp/app/entities/state-manage/state-manage.model';

describe('Component Tests', () => {

    describe('StateManage Management Component', () => {
        let comp: StateManageComponent;
        let fixture: ComponentFixture<StateManageComponent>;
        let service: StateManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StateManageComponent],
                providers: [
                    StateManageService
                ]
            })
            .overrideTemplate(StateManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new StateManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.states[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

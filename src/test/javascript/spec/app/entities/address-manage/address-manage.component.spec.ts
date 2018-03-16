/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { AddressManageComponent } from '../../../../../../main/webapp/app/entities/address-manage/address-manage.component';
import { AddressManageService } from '../../../../../../main/webapp/app/entities/address-manage/address-manage.service';
import { AddressManage } from '../../../../../../main/webapp/app/entities/address-manage/address-manage.model';

describe('Component Tests', () => {

    describe('AddressManage Management Component', () => {
        let comp: AddressManageComponent;
        let fixture: ComponentFixture<AddressManageComponent>;
        let service: AddressManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [AddressManageComponent],
                providers: [
                    AddressManageService
                ]
            })
            .overrideTemplate(AddressManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AddressManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

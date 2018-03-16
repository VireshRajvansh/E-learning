/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { AddressManageDetailComponent } from '../../../../../../main/webapp/app/entities/address-manage/address-manage-detail.component';
import { AddressManageService } from '../../../../../../main/webapp/app/entities/address-manage/address-manage.service';
import { AddressManage } from '../../../../../../main/webapp/app/entities/address-manage/address-manage.model';

describe('Component Tests', () => {

    describe('AddressManage Management Detail Component', () => {
        let comp: AddressManageDetailComponent;
        let fixture: ComponentFixture<AddressManageDetailComponent>;
        let service: AddressManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [AddressManageDetailComponent],
                providers: [
                    AddressManageService
                ]
            })
            .overrideTemplate(AddressManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AddressManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.address).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

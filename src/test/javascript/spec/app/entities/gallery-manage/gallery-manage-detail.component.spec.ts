/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { GalleryManageDetailComponent } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage-detail.component';
import { GalleryManageService } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage.service';
import { GalleryManage } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage.model';

describe('Component Tests', () => {

    describe('GalleryManage Management Detail Component', () => {
        let comp: GalleryManageDetailComponent;
        let fixture: ComponentFixture<GalleryManageDetailComponent>;
        let service: GalleryManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryManageDetailComponent],
                providers: [
                    GalleryManageService
                ]
            })
            .overrideTemplate(GalleryManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GalleryManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new GalleryManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gallery).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

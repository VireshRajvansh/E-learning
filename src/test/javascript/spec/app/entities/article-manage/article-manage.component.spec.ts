/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { ArticleManageComponent } from '../../../../../../main/webapp/app/entities/article-manage/article-manage.component';
import { ArticleManageService } from '../../../../../../main/webapp/app/entities/article-manage/article-manage.service';
import { ArticleManage } from '../../../../../../main/webapp/app/entities/article-manage/article-manage.model';

describe('Component Tests', () => {

    describe('ArticleManage Management Component', () => {
        let comp: ArticleManageComponent;
        let fixture: ComponentFixture<ArticleManageComponent>;
        let service: ArticleManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ArticleManageComponent],
                providers: [
                    ArticleManageService
                ]
            })
            .overrideTemplate(ArticleManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArticleManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ArticleManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.articles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

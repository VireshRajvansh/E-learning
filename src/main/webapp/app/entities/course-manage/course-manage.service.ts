import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CourseManage } from './course-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CourseManageService {

    private resourceUrl =  SERVER_API_URL + 'api/courses';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/courses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(course: CourseManage): Observable<CourseManage> {
        const copy = this.convert(course);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(course: CourseManage): Observable<CourseManage> {
        const copy = this.convert(course);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CourseManage> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to CourseManage.
     */
    private convertItemFromServer(json: any): CourseManage {
        const entity: CourseManage = Object.assign(new CourseManage(), json);
        entity.premiumTill = this.dateUtils
            .convertLocalDateFromServer(json.premiumTill);
        return entity;
    }

    /**
     * Convert a CourseManage to a JSON which can be sent to the server.
     */
    private convert(course: CourseManage): CourseManage {
        const copy: CourseManage = Object.assign({}, course);
        copy.premiumTill = this.dateUtils
            .convertLocalDateToServer(course.premiumTill);
        return copy;
    }
}

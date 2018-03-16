import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TeacherManage } from './teacher-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TeacherManageService {

    private resourceUrl =  SERVER_API_URL + 'api/teachers';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/teachers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(teacher: TeacherManage): Observable<TeacherManage> {
        const copy = this.convert(teacher);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(teacher: TeacherManage): Observable<TeacherManage> {
        const copy = this.convert(teacher);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TeacherManage> {
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
     * Convert a returned JSON object to TeacherManage.
     */
    private convertItemFromServer(json: any): TeacherManage {
        const entity: TeacherManage = Object.assign(new TeacherManage(), json);
        entity.dob = this.dateUtils
            .convertLocalDateFromServer(json.dob);
        entity.premiumTill = this.dateUtils
            .convertLocalDateFromServer(json.premiumTill);
        return entity;
    }

    /**
     * Convert a TeacherManage to a JSON which can be sent to the server.
     */
    private convert(teacher: TeacherManage): TeacherManage {
        const copy: TeacherManage = Object.assign({}, teacher);
        copy.dob = this.dateUtils
            .convertLocalDateToServer(teacher.dob);
        copy.premiumTill = this.dateUtils
            .convertLocalDateToServer(teacher.premiumTill);
        return copy;
    }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StudentManage } from './student-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class StudentManageService {

    private resourceUrl =  SERVER_API_URL + 'api/students';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/students';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(student: StudentManage): Observable<StudentManage> {
        const copy = this.convert(student);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(student: StudentManage): Observable<StudentManage> {
        const copy = this.convert(student);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<StudentManage> {
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
     * Convert a returned JSON object to StudentManage.
     */
    private convertItemFromServer(json: any): StudentManage {
        const entity: StudentManage = Object.assign(new StudentManage(), json);
        entity.dob = this.dateUtils
            .convertLocalDateFromServer(json.dob);
        entity.premiumTill = this.dateUtils
            .convertLocalDateFromServer(json.premiumTill);
        return entity;
    }

    /**
     * Convert a StudentManage to a JSON which can be sent to the server.
     */
    private convert(student: StudentManage): StudentManage {
        const copy: StudentManage = Object.assign({}, student);
        copy.dob = this.dateUtils
            .convertLocalDateToServer(student.dob);
        copy.premiumTill = this.dateUtils
            .convertLocalDateToServer(student.premiumTill);
        return copy;
    }
}

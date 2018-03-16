import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EducationManage } from './education-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EducationManageService {

    private resourceUrl =  SERVER_API_URL + 'api/educations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/educations';

    constructor(private http: Http) { }

    create(education: EducationManage): Observable<EducationManage> {
        const copy = this.convert(education);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(education: EducationManage): Observable<EducationManage> {
        const copy = this.convert(education);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EducationManage> {
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
     * Convert a returned JSON object to EducationManage.
     */
    private convertItemFromServer(json: any): EducationManage {
        const entity: EducationManage = Object.assign(new EducationManage(), json);
        return entity;
    }

    /**
     * Convert a EducationManage to a JSON which can be sent to the server.
     */
    private convert(education: EducationManage): EducationManage {
        const copy: EducationManage = Object.assign({}, education);
        return copy;
    }
}

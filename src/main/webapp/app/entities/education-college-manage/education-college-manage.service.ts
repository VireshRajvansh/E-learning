import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EducationCollegeManage } from './education-college-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EducationCollegeManageService {

    private resourceUrl =  SERVER_API_URL + 'api/education-colleges';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/education-colleges';

    constructor(private http: Http) { }

    create(educationCollege: EducationCollegeManage): Observable<EducationCollegeManage> {
        const copy = this.convert(educationCollege);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(educationCollege: EducationCollegeManage): Observable<EducationCollegeManage> {
        const copy = this.convert(educationCollege);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EducationCollegeManage> {
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
     * Convert a returned JSON object to EducationCollegeManage.
     */
    private convertItemFromServer(json: any): EducationCollegeManage {
        const entity: EducationCollegeManage = Object.assign(new EducationCollegeManage(), json);
        return entity;
    }

    /**
     * Convert a EducationCollegeManage to a JSON which can be sent to the server.
     */
    private convert(educationCollege: EducationCollegeManage): EducationCollegeManage {
        const copy: EducationCollegeManage = Object.assign({}, educationCollege);
        return copy;
    }
}

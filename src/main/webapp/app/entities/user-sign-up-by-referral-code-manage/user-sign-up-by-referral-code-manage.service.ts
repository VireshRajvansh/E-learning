import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserSignUpByReferralCodeManage } from './user-sign-up-by-referral-code-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserSignUpByReferralCodeManageService {

    private resourceUrl =  SERVER_API_URL + 'api/user-sign-up-by-referral-codes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/user-sign-up-by-referral-codes';

    constructor(private http: Http) { }

    create(userSignUpByReferralCode: UserSignUpByReferralCodeManage): Observable<UserSignUpByReferralCodeManage> {
        const copy = this.convert(userSignUpByReferralCode);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userSignUpByReferralCode: UserSignUpByReferralCodeManage): Observable<UserSignUpByReferralCodeManage> {
        const copy = this.convert(userSignUpByReferralCode);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserSignUpByReferralCodeManage> {
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
     * Convert a returned JSON object to UserSignUpByReferralCodeManage.
     */
    private convertItemFromServer(json: any): UserSignUpByReferralCodeManage {
        const entity: UserSignUpByReferralCodeManage = Object.assign(new UserSignUpByReferralCodeManage(), json);
        return entity;
    }

    /**
     * Convert a UserSignUpByReferralCodeManage to a JSON which can be sent to the server.
     */
    private convert(userSignUpByReferralCode: UserSignUpByReferralCodeManage): UserSignUpByReferralCodeManage {
        const copy: UserSignUpByReferralCodeManage = Object.assign({}, userSignUpByReferralCode);
        return copy;
    }
}

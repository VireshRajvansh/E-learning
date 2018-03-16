import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StripeCustomerManage } from './stripe-customer-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class StripeCustomerManageService {

    private resourceUrl =  SERVER_API_URL + 'api/stripe-customers';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stripe-customers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(stripeCustomer: StripeCustomerManage): Observable<StripeCustomerManage> {
        const copy = this.convert(stripeCustomer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(stripeCustomer: StripeCustomerManage): Observable<StripeCustomerManage> {
        const copy = this.convert(stripeCustomer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<StripeCustomerManage> {
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
     * Convert a returned JSON object to StripeCustomerManage.
     */
    private convertItemFromServer(json: any): StripeCustomerManage {
        const entity: StripeCustomerManage = Object.assign(new StripeCustomerManage(), json);
        entity.created = this.dateUtils
            .convertDateTimeFromServer(json.created);
        entity.expectedExpiryDate = this.dateUtils
            .convertLocalDateFromServer(json.expectedExpiryDate);
        return entity;
    }

    /**
     * Convert a StripeCustomerManage to a JSON which can be sent to the server.
     */
    private convert(stripeCustomer: StripeCustomerManage): StripeCustomerManage {
        const copy: StripeCustomerManage = Object.assign({}, stripeCustomer);

        copy.created = this.dateUtils.toDate(stripeCustomer.created);
        copy.expectedExpiryDate = this.dateUtils
            .convertLocalDateToServer(stripeCustomer.expectedExpiryDate);
        return copy;
    }
}

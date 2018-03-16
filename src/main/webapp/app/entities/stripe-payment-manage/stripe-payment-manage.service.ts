import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StripePaymentManage } from './stripe-payment-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class StripePaymentManageService {

    private resourceUrl =  SERVER_API_URL + 'api/stripe-payments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stripe-payments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(stripePayment: StripePaymentManage): Observable<StripePaymentManage> {
        const copy = this.convert(stripePayment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(stripePayment: StripePaymentManage): Observable<StripePaymentManage> {
        const copy = this.convert(stripePayment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<StripePaymentManage> {
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
     * Convert a returned JSON object to StripePaymentManage.
     */
    private convertItemFromServer(json: any): StripePaymentManage {
        const entity: StripePaymentManage = Object.assign(new StripePaymentManage(), json);
        entity.created = this.dateUtils
            .convertDateTimeFromServer(json.created);
        entity.planCreated = this.dateUtils
            .convertDateTimeFromServer(json.planCreated);
        entity.periodEnd = this.dateUtils
            .convertDateTimeFromServer(json.periodEnd);
        entity.periodStart = this.dateUtils
            .convertDateTimeFromServer(json.periodStart);
        return entity;
    }

    /**
     * Convert a StripePaymentManage to a JSON which can be sent to the server.
     */
    private convert(stripePayment: StripePaymentManage): StripePaymentManage {
        const copy: StripePaymentManage = Object.assign({}, stripePayment);

        copy.created = this.dateUtils.toDate(stripePayment.created);

        copy.planCreated = this.dateUtils.toDate(stripePayment.planCreated);

        copy.periodEnd = this.dateUtils.toDate(stripePayment.periodEnd);

        copy.periodStart = this.dateUtils.toDate(stripePayment.periodStart);
        return copy;
    }
}

import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { POI } from './poi';
import {Shared} from './shared'
@Injectable()
export class POIService {
    constructor(private http: Http, private shared: Shared) { }
    getPOIsPromise(modelType): Promise<POI[]> {
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        //let options = new RequestOptions({ headers: headers });     
        let params: URLSearchParams = new URLSearchParams();
        params.set('ModelType', modelType);
        return this.http.get('/api/POIs', {
            search: params
        })
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);

    }
    getPOIsData() {
        this.shared.isPOIsLoading = true;
        this.getPOIsPromise(this.shared.activeModelType).then(pOIs => (this.shared.pOIs = pOIs, this.shared.isPOIsLoading = false));
    }
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
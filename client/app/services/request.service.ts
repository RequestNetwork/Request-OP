import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {}

  signRequest(request): Observable < any > {
    return this.http.post('/api/signRequest', JSON.stringify(request), this.options).map(
      res => {
        return res.json();
      },
      err => {
        return err;
      });
  }

  getTxDetails(txHash): Observable < any > {
    return this.http.get(`/api/getTxDetails/${txHash}`, this.options).map(
      res => {
        return res.json();
      },
      err => {
        return err;
      });
  }

}

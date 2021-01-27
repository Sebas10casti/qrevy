import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {}

  options = {};
  BASE_API_URL = 'https://restcountries.eu/rest/v2/all';

  request(rq: Observable<any>): Observable<any> {
    return new Observable<any>(subscriber => {
      rq.subscribe(
        data => {
          subscriber.next(data);
          subscriber.complete();
        }
      );
    });
  }

  /**http methods */
  get() {
    return this.request(this.http.get(this.BASE_API_URL));
  }

}

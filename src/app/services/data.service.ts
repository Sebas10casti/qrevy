import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private api: ApiService) {
  }

  country(){
    return this.api.get();
  }

}

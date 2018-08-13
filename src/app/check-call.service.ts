import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CheckCallService {
  constructor (private http: Http) {}
  callApi(url: string) {
    return this.http.get(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import config from '../../config/service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getAnagrams(text: string) {
    if (text !== undefined && text !== '') {
      const url = config.baseUrl + config.endpoint.anagrams + '?text=' + text;
      return this.http.get<any>(url);
    }
  }
}

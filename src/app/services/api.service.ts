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

  // Return all the anagrams for a provided word
  getAnagrams(text: string) {
    if (text !== undefined && text !== '') {
      const url = config.baseUrl + config.endpoint.anagrams + '?text=' + text;
      return this.http.get<any>(url);
    }
  }

  // Return the word found in anagrams
  filterAnagrams(anagrams: Array<string>): Array<any> {
    if (anagrams !== undefined && anagrams !== []) {
      const url = config.baseUrl + config.endpoint.dictionary;
      if (anagrams.length <= 50) {
        return [this.http.post<any>(url, { list: anagrams })];
      } else {
        const numOfLoop = Math.ceil(anagrams.length / 50);
        return this.getFilterAnagramsPromises(numOfLoop, url, anagrams);
      }
    }
  }

  // Return all the request
  getFilterAnagramsPromises(numOfLoop: number, url: string, anagrams: any): Array<any> {
    return Array.from(Array(numOfLoop)).map((_, index: number) =>
      this.http.post<any>(url, { list: anagrams.slice((index * 50), ((index + 1) * 50) - 1) })
    );
  }
}

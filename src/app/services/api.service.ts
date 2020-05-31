// This file is part of Anagrams Factory.

// Anagrams Factory is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Anagrams Factory is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Anagrams Factory.  If not, see <http://www.gnu.org/licenses/>.

// Copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import config from '../../config/service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  promisesBucket = 50;

  // Return all the anagrams for a provided word
  getAnagrams(text: string) {
    if (text !== undefined && text !== '') {
      const url = config.baseUrl + config.endpoint.anagrams + '?text=' + text;
      return this.http.get(url, { responseType: 'text' });
    }
  }

  // Return the word found in anagrams
  filterAnagrams(anagrams: Array<string>): Array<any> {
    if (anagrams !== undefined && anagrams !== []) {
      const url = config.baseUrl + config.endpoint.dictionary;
      if (anagrams.length <= this.promisesBucket) {
        return [this.http.post<any>(url, { list: anagrams })];
      } else {
        const numOfLoop = Math.ceil(anagrams.length / this.promisesBucket);
        return this.getFilterAnagramsPromises(numOfLoop, url, anagrams);
      }
    }
  }

  // Return all the request
  getFilterAnagramsPromises(numOfLoop: number, url: string, anagrams: any): Array<any> {
    return Array.from(Array(numOfLoop)).map((_, index: number) =>
      this.http.post<any>(url, { list: anagrams.slice((index * 50), ((index + 1) * 50)) })
    );
  }
}

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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ApiService]
})

export class ResultsComponent {

  constructor(private apiservice: ApiService) {
    this.setProgressbarStatus = this.setProgressbarStatus.bind(this);
    this.getProgressbarStatus = this.getProgressbarStatus.bind(this);
  }

  page = 1;
  min = 0;
  promiseTotal = 0;
  promisesLeft = 0;
  promisesSuccess = 0;
  promisesError = 0;
  dop = 10;
  text = '';
  filteringDone = false;
  results = [];

  @Input() anagrams: Array<string>;
  @Input() showProgressbar: boolean;
  @Input() showContinue: boolean;
  @Output() anagramsChange = new EventEmitter();

  // Open the dictionary functionalities
  goToDictionary() {
    this.anagramsChange.emit({
      action: 'dictionary',
      results: Array.isArray(this.results) && this.results.length > 0 ? this.results : null
    });
  }

  // Get the words from the anagrams
  async filterResults() {
    this.showProgressbar = true;
    this.anagramsChange.emit({
      action: 'progressbar',
      results: true
    });
    const results: Array<any> = [];
    const promisesResults = this.apiservice.filterAnagrams(this.anagrams);
    const loop = Math.floor(promisesResults.length / this.dop) + (promisesResults.length % this.dop > 0 ? 1 : 0);
    this.setProgressbarStatus('total', promisesResults.length);
    this.setProgressbarStatus('left', promisesResults.length);
    for (let i = 0; i < loop; i++) {
      const data = await this.getFilteredResults(
        promisesResults.slice(i * this.dop, (i + 1) * this.dop),
        this.setProgressbarStatus,
        this.getProgressbarStatus
      );
      const resultsArray = this.getResultsArray(data);
      if (resultsArray !== null) {
        results.push(resultsArray);
      }
    }
    this.showContinue = true;
    this.results = results.flat(2);

  }

  // Resolve all the promise for search available word
  getFilteredResults(promises: any, setProgressbarStatus: any, getProgressbarStatus: any) {
    return new Promise((resolve: any) => {
      const results: Array<any> = [];
      let promiseCounter = 0;
      let errorCounter = getProgressbarStatus('error');
      let promiseSuccess = getProgressbarStatus('success');
      promises.forEach((promiseObj: any) => {
        promiseObj.subscribe({
          next: (data: any) => {
            if (data !== null) { results.push(data); }
            promiseCounter += 1;
            promiseSuccess += 1;
            setProgressbarStatus('success', getProgressbarStatus('success') + 1);
            setProgressbarStatus('left', getProgressbarStatus('left') - 1);
            if (promiseCounter === promises.length) {
              setProgressbarStatus('end', true);
              resolve(results);
            }
          },
          error: (error: any) => {
            promiseCounter += 1;
            errorCounter += 1;
            setProgressbarStatus('error', getProgressbarStatus('error') + 1);
            setProgressbarStatus('left', getProgressbarStatus('left') - 1);
            console.error('Error resolving promise. Error:', error);
            resolve(results);
          }
        });
      });
    });
  }

  // Flat results in array
  getResultsArray(data: any) {
    const result: Array<any> = ((data !== undefined && Array.isArray(data) && data.length > 0) ?
      data.map((list: any) => (list !== undefined && Array.isArray(list) && list.length > 0) ?
        (list.map((word: any) => word)) : null) : null);
    return (result !== undefined && Array.isArray(result) && result.length > 0) ? result.filter((item: any) => item != null) : null;
  }

  // Set value for progress bar
  setProgressbarStatus(key: string, value: any) {
    switch (key) {
      case 'total':
        this.promiseTotal = value;
        break;
      case 'success':
        this.promisesSuccess = value;
        break;
      case 'error':
        this.promisesError = value;
        break;
      case 'left':
        this.promisesLeft = value;
        break;
    }
  }

  // Get value from progress bar
  getProgressbarStatus(key: string) {
    switch (key) {
      case 'total':
        return this.promiseTotal;
      case 'success':
        return this.promisesSuccess;
      case 'error':
        return this.promisesError;
      case 'left':
        return this.promisesLeft;
    }
  }
}

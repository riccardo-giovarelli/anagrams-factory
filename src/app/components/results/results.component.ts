import { Component, Input, OnInit } from '@angular/core';
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
  filteringDone: false;
  dop = 10;
  text = '';

  @Input() errorMessage = '';
  @Input() anagrams = [];
  @Input() showDictionary = false;
  @Input() showProgressbar = false;

  async filterResults() {
    this.showProgressbar = true;
    const results: Array<any> = [];
    const promisesResults = this.apiservice.filterAnagrams(this.anagrams);
    const loop = (Math.floor(promisesResults.length / this.dop) + promisesResults.length % this.dop);
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
          }
        });
      });
    });
  }

  // Flat results in array
  getResultsArray(data: any) {
    const result: Array<any> = ((data !== undefined && Array.isArray(data)) ?
      data.map((list: any) => (list !== undefined && Array.isArray(list)) ? (list.map((word: any) => word)) : null) : null)
      .filter((item: any) => item != null);
    return (result !== undefined && Array.isArray(result)) ? result.flat() : null;
  }

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

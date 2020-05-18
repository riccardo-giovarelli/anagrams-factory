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
  text = '';


  @Input() errorMessage = '';
  @Input() anagrams = [];
  @Input() showDictionary = false;
  @Input() showProgressbar = false;


  async filterResults() {
    this.showProgressbar = true;
    const results: Array<any> = [];
    const promisesResults = this.apiservice.filterAnagrams(this.anagrams);
    const loop = (Math.floor(promisesResults.length / 10) + promisesResults.length % 10);
    this.setProgressbarStatus('total', promisesResults.length);
    this.setProgressbarStatus('left', promisesResults.length);
    for (let i = 0; i < loop; i++) {
      const data = await this.getFilteredResults(
        promisesResults.slice(i * 10, (i + 1) * 10),
        this.setProgressbarStatus,
        this.getProgressbarStatus
      );
      results.push(data);
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

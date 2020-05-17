import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ApiService]
})

export class ResultsComponent implements OnInit {

  constructor(private apiservice: ApiService) {
    this.setProgressbarStatus = this.setProgressbarStatus.bind(this);
  }

  page: number;
  promiseTotal: number;
  promisesDone: number;
  filteringDone: boolean;


  @Input() errorMessage = '';
  @Input() anagrams = [];
  @Input() showDictionary = false;
  @Input() showProgressbar = false;


  // Angular ngOnInit
  ngOnInit() {
    this.page = 1;
    this.promiseTotal = 0;
    this.promisesDone = 0;
    this.filteringDone = false;
  }

  setProgressbarStatus(key: string, value: any) {
    switch (key) {
      case 'total':
        this.promiseTotal = value;
        break;
      case 'done':
        this.promisesDone = value;
        break;
      case 'end':
        this.filteringDone = value;
        break;
    }
  }

  filterResults() {
    this.showProgressbar = true;
    this.getFilteredResults(this.setProgressbarStatus).then((results: any) => {
    });
  }

  // Resolve all the promise for search available word
  getFilteredResults(setProgressbarStatus: any) {
    const results: Array<any> = [];
    const promisesResults = this.apiservice.filterAnagrams(this.anagrams);
    setProgressbarStatus('total', promisesResults.length);
    return new Promise((resolve: any) => {
      let promiseCounter = 0;
      promisesResults.forEach((promiseObj: any) => {
        promiseObj.subscribe({
          next: (data: any) => {
            if (data !== null) { results.push(data); }
            promiseCounter += 1;
            setProgressbarStatus('done', promiseCounter);
            if (promiseCounter === promisesResults.length) {
              setProgressbarStatus('end', true);
              resolve(results);
            }
          },
          error: (error: any) => {
            promiseCounter += 1;
            setProgressbarStatus('done', promiseCounter);
            console.error('Error resolving promise. Error:', error);
          }
        });
      });
    });
  }
}

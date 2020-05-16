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
    this.getFilteredResults = this.getFilteredResults.bind(this);
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

  filterResults() {
    this.getFilteredResults().then((results: any) => {
      console.log(results);
    });
  }

  // Resolve all the promise for search available word
  getFilteredResults() {
    const results: Array<any> = [];
    let promiseCounter: number;
    const promisesResults = this.apiservice.filterAnagrams(this.anagrams);
    return new Promise((resolve: any) => {
      promisesResults.forEach((promiseObj: any) => {
        promiseObj.then((result: any) => {
          result.json().then((response: any) => {
            results.push(response);
            promiseCounter += 1;
            if (promiseCounter === promisesResults.length) {
              resolve(results);
            }
          });
        }).catch((error: any) => {
          console.error('Error resolving promise. Error:', error);
        });
      });
    });
  }
}

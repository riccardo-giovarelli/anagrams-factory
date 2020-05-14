import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ApiService]
})

export class ResultsComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  p: number;

  @Input() errorMessage = '';
  @Input() anagrams = [];
  @Output() dictionaryResults = new EventEmitter();

  // Angular ngOnInit
  ngOnInit() {
    this.p = 1;
  }

  filterResults() {
    this.getFilteredResults().then((results: any) => {
      // Do something asshole!!!
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

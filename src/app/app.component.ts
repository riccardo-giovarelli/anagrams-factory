import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})

export class AppComponent implements OnInit {

  anagrams: Array<string>;
  words: Array<any>;
  spinnerVisibility: boolean;
  showResults: boolean;
  showDictionary: boolean;
  showProgressbar: boolean;
  showSearch: boolean;

  ngOnInit() {
    this.anagrams = [];
    this.spinnerVisibility = false;
    this.showDictionary = false;
    this.showResults = false;
    this.showProgressbar = false;
    this.showSearch = true;
  }

  setAnagramsResults(result: any) {
    switch (result.action) {
      case 'show-results':
        this.anagrams = result.results;
        this.spinnerVisibility = false;
        this.showResults = true;
        this.showDictionary = false;
        this.showProgressbar = false;
        this.showSearch = false;
        break;
      case 'reset':
        this.anagrams = [];
        this.spinnerVisibility = false;
        this.showResults = false;
        this.showDictionary = false;
        this.showProgressbar = false;
        this.showSearch = true;
        break;
      case 'spinner':
        this.spinnerVisibility = result.results;
        this.showResults = false;
        this.showDictionary = false;
        this.showProgressbar = false;
        this.showSearch = false;
        break;
      case 'dictionary':
        this.spinnerVisibility = false;
        this.showResults = false;
        this.showDictionary = true;
        this.showProgressbar = false;
        this.showSearch = false;
        this.words = result.results;
        break;
    }
  }
}

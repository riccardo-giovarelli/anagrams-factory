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
  errorMessage: string;
  spinnerVisibility: boolean;
  showAnagrams: boolean;

  ngOnInit() {
    this.anagrams = [];
    this.errorMessage = '';
    this.spinnerVisibility = false;
    this.showAnagrams = false;
  }

  setAnagramsResults(result: any) {
    switch (result.action) {
      case 'show-results':
        this.errorMessage = '';
        this.anagrams = result.results;
        this.spinnerVisibility = false;
        this.showAnagrams = true;
        break;
      case 'reset':
        this.errorMessage = '';
        this.anagrams = [];
        this.spinnerVisibility = false;
        this.showAnagrams = false;
        break;
      case 'show-error':
        this.anagrams = [];
        this.errorMessage = result.results;
        this.spinnerVisibility = false;
        this.showAnagrams = false;
        break;
      case 'spinner':
        this.errorMessage = '';
        this.spinnerVisibility = result.results;
        this.showAnagrams = false;
        break;
    }
  }

  setDictionaryResults(result: any) {
    switch (result.action) {
      case 'hide-result':
        this.errorMessage = '';
        this.showAnagrams = false;
        this.spinnerVisibility = false;
        break;
    }
  }
}

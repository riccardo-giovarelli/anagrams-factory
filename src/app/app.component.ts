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
  showResults: boolean;
  showDictionary: boolean;
  showProgressbar: boolean;
  showError: boolean;

  ngOnInit() {
    this.anagrams = [];
    this.errorMessage = '';
    this.spinnerVisibility = false;
    this.showDictionary = false;
    this.showResults = false;
    this.showProgressbar = false;
    this.showError = false;
  }

  setAnagramsResults(result: any) {
    switch (result.action) {
      case 'show-results':
        this.errorMessage = '';
        this.showError = false;
        this.anagrams = result.results;
        this.spinnerVisibility = false;
        this.showResults = true;
        this.showDictionary = false;
        this.showProgressbar = false;
        break;
      case 'reset':
        this.errorMessage = '';
        this.showError = false;
        this.anagrams = [];
        this.spinnerVisibility = false;
        this.showResults = false;
        this.showDictionary = false;
        this.showProgressbar = false;
        break;
      case 'show-error':
        this.anagrams = [];
        this.errorMessage = result.results;
        this.showError = true;
        this.spinnerVisibility = false;
        this.showResults = false;
        this.showDictionary = false;
        this.showProgressbar = false;
        break;
      case 'spinner':
        this.errorMessage = '';
        this.showError = false;
        this.spinnerVisibility = result.results;
        this.showResults = false;
        this.showDictionary = false;
        this.showProgressbar = false;
        break;
    }
  }
}

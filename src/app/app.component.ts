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

  ngOnInit() {
    this.anagrams = [];
    this.errorMessage = '';
    this.spinnerVisibility = false;
  }

  setResults(result: any) {
    switch (result.status) {
      case 'results':
        this.errorMessage = '';
        this.anagrams = result.results;
        this.spinnerVisibility = false;
        break;
      case 'error':
        this.anagrams = [];
        this.errorMessage = result.results;
        this.spinnerVisibility = false;
        break;
      case 'spinner':
        this.errorMessage = '';
        this.spinnerVisibility = result.results;
        break;
    }

  }

}

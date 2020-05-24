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
  showContinue: boolean;


  ngOnInit() {
    this.anagrams = [];
    this.words = [];
    this.spinnerVisibility = false;
    this.showDictionary = false;
    this.showResults = false;
    this.showProgressbar = false;
    this.showSearch = true;
    this.showContinue = false;
  }

  setAnagramsResults(result: any) {
    switch (result.action) {
      case 'show-results':
        if (result.results !== null) { this.anagrams = result.results; }
        this.spinnerVisibility = false;
        this.showResults = true;
        this.showDictionary = false;
        this.showProgressbar = false;
        this.showSearch = false;
        break;
      case 'reset':
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
        if (result.results !== null) { this.words = result.results; }
        break;
      case 'progressbar':
        this.showProgressbar = true;
        this.showDictionary = false;
        this.showResults = true;
        this.showContinue = true;
        break;
    }
  }
}

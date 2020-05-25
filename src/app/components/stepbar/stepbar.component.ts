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

import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stepbar',
  templateUrl: './stepbar.component.html',
  styleUrls: ['./stepbar.component.scss']
})
export class StepbarComponent {

  constructor() { }

  @Input() showResults: boolean;
  @Input() showDictionary: boolean;
  @Input() showProgressbar: boolean;
  @Input() showSearch: boolean;
  @Output() anagramsChange = new EventEmitter();


  backToSearchAnagrams() {
    if (this.showSearch === false || this.showProgressbar || this.showDictionary || this.showDictionary) {
      this.anagramsChange.emit({
        action: 'reset',
        results: null
      });
    }
  }

  backToAnagramsResults() {
    if ((this.showProgressbar && this.showResults) || this.showDictionary || this.showDictionary) {
      this.anagramsChange.emit({
        action: 'show-results',
        results: null
      });
    }
  }

  backToDictionarySearch() {
    if (this.showDictionary) {
      this.anagramsChange.emit({
        action: 'progressbar',
        results: null
      });
    }
  }
}

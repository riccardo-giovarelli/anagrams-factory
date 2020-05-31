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

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { getUniqueValue } from '../../lib/general';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ApiService]
})

export class SearchComponent implements OnInit {

  word: string;
  isInvalid: boolean;
  invalidMessage: string;
  title: string;
  localSpinner: boolean;
  currentRequest: any;

  @Output() anagramsChange = new EventEmitter();
  @Input() showSearch: boolean;

  constructor(private apiservice: ApiService) { }

  // Angular ngOnInit
  ngOnInit() {
    this.word = '';
    this.isInvalid = false;
    this.invalidMessage = '';
    this.title = 'Anagrams Factory';
    this.localSpinner = false;
  }

  // Angular onSearchChange
  onSearchChange(event: any) {
    switch (true) {
      case (event.indexOf(' ') >= 0):
        this.isInvalid = true;
        this.invalidMessage = 'No space char allowed';
        break;
      case (/[\|\!\?_\[\]\^\'\"£$%&\/()=*+\\]+/.test(event)):
        this.isInvalid = true;
        this.invalidMessage = 'No special char allowed';
        break;
      default:
        this.isInvalid = false;
        this.invalidMessage = '';
        break;
    }
  }

  // Clear input element
  clear() {
    this.word = '';
    this.isInvalid = false;
    this.invalidMessage = '';
    this.localSpinner = false;
    if (this.currentRequest !== undefined) { this.currentRequest.unsubscribe(); }
    this.anagramsChange.emit({ action: 'reset' });
  }

  // Get anagrams
  getAnagrams() {
    if (!this.isInvalid && this.word !== '') {
      this.localSpinner = true;
      this.currentRequest = this.apiservice.getAnagrams(this.word).subscribe({
        next: (data: any) => {
          this.anagramsChange.emit({
            action: 'show-results',
            results: getUniqueValue(data.substring(0, data.length - 1).split(','))
          });
          this.localSpinner = false;
        },
        error: (error: any) => {
          console.error('Error while retrieving anagrams - ' + error.message);
          this.anagramsChange.emit({
            action: 'show-error',
            results: 'Error: unable to retrieving anagrams. Check the server connection.'
          });
          this.localSpinner = false;
        }
      });
    }
  }

}

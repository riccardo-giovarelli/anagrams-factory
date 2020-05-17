import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

  @Input() anagrams = [];
  @Output() anagramsChange = new EventEmitter();

  constructor(private apiservice: ApiService) { }

  // Angular ngOnInit
  ngOnInit() {
    this.word = '';
    this.isInvalid = false;
    this.invalidMessage = '';
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
    this.anagramsChange.emit({
      action: 'reset'
    });
  }

  // Get anagrams
  getAnagrams() {
    if (!this.isInvalid) {
      this.anagramsChange.emit({
        action: 'spinner',
        results: true
      });
      this.apiservice.getAnagrams(this.word).subscribe({
        next: (data: any) => {
          this.anagramsChange.emit({
            action: 'show-results',
            results: data
          });
        },
        error: (error: any) => {
          console.error('Error while retrieving anagrams - ' + error.message);
          this.anagramsChange.emit({
            action: 'show-error',
            results: 'Error: unable to retrieving anagrams. Check the server connection.'
          });
        }
      });
    }
  }

}

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

  @Input() anagrams = [];
  @Output() anagramsChange = new EventEmitter();

  constructor(private apiservice: ApiService) { }

  // Angular ngOnInit
  ngOnInit() {
    this.word = '';
  }

  // Clear input element
  clear() {
    this.word = '';
  }

  // Get anagrams
  getAnagrams() {
    this.anagramsChange.emit({
      status: 'spinner',
      results: true
    });
    this.apiservice.getAnagrams(this.word).subscribe({
      next: data => {
        this.anagramsChange.emit({
          status: 'results',
          results: data
        });
      },
      error: error => {
        this.anagramsChange.emit({
          status: 'error',
          results: 'Error while retrieving anagrams. Error: ' + error.message
        });
      }
    });
  }

}

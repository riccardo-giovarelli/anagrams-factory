import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [ApiService]
})
export class SearchboxComponent implements OnInit {

  constructor(private apiservice: ApiService) {
    this.word = '';
    this.anagrams = {};
  }

  word: string;
  anagrams: object;

  ngOnInit(): void {
  }

  // Clear input element
  clear() {
    this.word = '';
  }

  // Get anagrams
  getAnagrams() {
    this.apiservice.getAnagrams(this.word).subscribe({
      next: data => this.anagrams = data,
      error: error => console.error('Error while retrieving anagrams. Error:', error.message)
    });
  }
}

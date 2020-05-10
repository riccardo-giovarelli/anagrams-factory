import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [ApiService]
})
export class SearchboxComponent {

  constructor(private apiservice: ApiService) {
    this.word = '';
    this.anagrams = [];
  }

  word: string;
  anagrams: object;
  spinnerVisibility = false;

  // Clear input element
  clear() {
    this.word = '';
  }

  // Get anagrams
  getAnagrams() {
    this.spinnerVisibility = true;
    this.apiservice.getAnagrams(this.word).subscribe({
      next: data => {
        this.anagrams = data;
        this.spinnerVisibility = false;
      },
      error: error => console.error('Error while retrieving anagrams. Error:', error.message)
    });
  }
}

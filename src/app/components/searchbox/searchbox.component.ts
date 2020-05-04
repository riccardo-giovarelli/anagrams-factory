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

  }

  word: string;

  ngOnInit(): void {
  }

  // Clear input element
  clear() {
    this.word = '';
  }

  // Get anagrams
  anagrams() {
    this.apiservice.getAnagrams(this.word);
  }

}

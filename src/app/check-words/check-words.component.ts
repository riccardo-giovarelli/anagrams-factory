import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.css']
})

export class CheckWordsComponent {
  checkResult: Array<string>;
  @Input() anagrams: string;
  baseUrl = 'https://en.wiktionary.org/w/api.php?action=query&titles=';

  constructor(
    private http: HttpClient) { }

  checkWords = (currentWorld: string): any => {
    return this.http.get(this.baseUrl + currentWorld);
  }

  analizeList = (): void => {
    this.checkWords('ciao')
    .subscribe((data: any) => this.checkResult = data);
    console.log(this.checkResult);
  }
}

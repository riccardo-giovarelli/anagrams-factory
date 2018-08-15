import { Component, Input } from '@angular/core';
import { LoadDicService } from '../load-dic.service';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.css'],
  providers: [LoadDicService]
})

export class CheckWordsComponent {
  checkResult: Array<string>;
  @Input() anagrams: string;
  results: Array<string> = [];

  constructor(private _loadDic: LoadDicService) { }

  analizeList = (currentStrings: Array<string>): void => {
    this.results = [];
    const dictonary = this._loadDic.getDictionary();
    const dictonaryArray = JSON.parse(dictonary);

    for (const currentString of currentStrings) {
      for (const currentWord of dictonaryArray) {
        if (currentWord.word.toLowerCase() === currentString.toLowerCase()) {
          this.results.push(currentString.toLowerCase());
        }
      }
    }

    console.log(this.results.length);

    if (this.results.length === 0) {
      // Hide all li element
    }

    loopAnagrams:
    for (const currentString of currentStrings) {
      for (const realWorld of this.results) {
        if (realWorld.toLowerCase() === currentString.toLowerCase()) {
          continue loopAnagrams;
        }
      }
      document.getElementById('li_' + currentString.toLowerCase()).style.display = 'none';
    }
  }
}

import { Component, Input } from '@angular/core';
import { LoadDicService } from '../load-dic.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  providers: [LoadDicService]
})

export class CheckWordsComponent {
  checkResult: Array<string>;
  @Input() anagrams: string;
  results: Array<string> = [];

  constructor(private loadDic: LoadDicService) { }

  analizeList = (currentStrings: Array<string>) => {
    this.results = [];
    const dictonary = this.loadDic.getDictionary();
    const dictonaryArray = JSON.parse(dictonary);

    document.getElementById('main').className = 'loader';
    document.getElementById('overlay').style.display = 'block';

    _.defer(() => {
      for (const currentString of currentStrings) {
        for (const currentWord of dictonaryArray) {
          if (currentWord.word !== undefined &&
            currentWord.word !== null &&
            currentWord.word.toString().toLowerCase() === currentString.toLowerCase()) {
            this.results.push(currentString.toLowerCase());
          }
        }
      }

      switch (this.results.length === 0) {
        case true:
          const liElements = document.querySelectorAll('li[id^=\'li_\']');
          for (let i = 0; i < liElements.length; ++i) {
            liElements[i].setAttribute('style', 'display: none;');
          }
          break;
        case false:
          loopAnagrams:
          for (const currentString of currentStrings) {
            for (const realWorld of this.results) {
              if (realWorld.toLowerCase() === currentString.toLowerCase()) {
                continue loopAnagrams;
              }
            }
            document.getElementById('li_' + currentString.toLowerCase()).style.display = 'none';
          }
          break;
      }
      _.defer(() => {
        setTimeout(() => {
          document.getElementById('overlay').style.display = 'none';
          document.getElementById('main').className = '';
        }, 1000);
      });
    });
  }
}

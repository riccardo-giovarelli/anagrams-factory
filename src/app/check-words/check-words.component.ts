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
  baseUrl = 'http://en.wiktionary.org/w/api.php?action=query&titles=';
  result: any;

  constructor(private _loadDic: LoadDicService) { }

  analizeList = (currentStrings: Array<string>): void => {
    const dictonary = this._loadDic.getDictionary();
    console.log(dictonary);
    for (const currentString of currentStrings) {
    }
  }
}

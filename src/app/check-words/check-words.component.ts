import { Component, Input } from '@angular/core';
import { CheckCallService } from './../check-call.service';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.css']
})

export class CheckWordsComponent {
  checkResult: Array<string>;
  @Input() anagrams: string;
  baseUrl = 'https://en.wiktionary.org/w/api.php?action=query&titles=';

  constructor (private checkCall: CheckCallService) {}

  analizeList = (): void => {
    const result = this.checkCall.callApi(this.baseUrl + 'Ciao');
    console.log(result);
  }
}

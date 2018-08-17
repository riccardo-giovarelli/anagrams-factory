import { Component } from '@angular/core';

@Component({
  selector: 'app-update-anagrams',
  templateUrl: './update-anagrams.component.html',
  styleUrls: ['./update-anagrams.component.css']
})
export class UpdateAnagramsComponent {

  output: Array<string> = [];
  inputStateKo = 'bg-danger';
  inputStateOk = 'bg-light';
  inputState = this.inputStateOk;
  warningMessage = '';
  maxChar = 6;


  updateanAgrams = (currentWord: string): void => {
    switch (true) {
      case (currentWord.length === 0):
        this.inputState = this.inputStateOk;
        this.output = [];
        this.warningMessage = '';
        break;
      case (!/^[a-z]+$/i.test(currentWord)):
        this.inputState = this.inputStateKo;
        this.warningMessage = 'Only literal chars!';
        break;
      default:
        this.inputState = this.inputStateOk;
        this.warningMessage = '';
        this.output = this.getAnagrams(currentWord);
        break;
    }
  }

  swap = (chars: Array<string>, i: number, j: number): void => {
      const tmp: string = chars[i];
      chars[i] = chars[j];
      chars[j] = tmp;
  }

  getAnagrams = (input: string): Array<string> => {
    const counter: Array<number> = [];
    let anagrams: Array<string> = [];
    const chars: Array<string> = input.split('');
    const length: number = chars.length;
    let i = 0;

    for (i = 0; i < length; i++) {
        counter[i] = 0;
    }
    anagrams.push(input.toUpperCase());
    i = 0;
    while (i < length) {
        if (counter[i] < i) {
            this.swap(chars, i % 2 === 1 ? counter[i] : 0, i);
            counter[i]++;
            i = 0;
            anagrams.push(chars.join('').toUpperCase());
        } else {
            counter[i] = 0;
            i++;
        }
    }
    anagrams = Array.from(new Set(anagrams));

    return anagrams;
  }
}

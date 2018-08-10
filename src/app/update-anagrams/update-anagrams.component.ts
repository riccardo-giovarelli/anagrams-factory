import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-anagrams',
  templateUrl: './update-anagrams.component.html',
  styleUrls: ['./update-anagrams.component.css']
})
export class UpdateAnagramsComponent {

  output: Array<string> = [];

  updateanAgrams = (currentWord: string): void => {
    if (currentWord.length > 6) {
      return;
    }
    if (!/^[a-z]+$/i.test(currentWord)) {
      return;
    }
    this.output = this.getAnagrams(currentWord);
  }

  swap = (chars: Array<string>, i: number, j: number): void => {
      const tmp: string = chars[i];
      chars[i] = chars[j];
      chars[j] = tmp;
  }

  getAnagrams = (input: string): Array<string> => {
    const counter: Array<number> = [];
    const anagrams: Array<string> = [];
    const chars: Array<string> = input.split('');
    const length: number = chars.length;
    let i = 0;

    for (i = 0; i < length; i++) {
        counter[i] = 0;
    }
    anagrams.push(input);
    i = 0;
    while (i < length) {
        if (counter[i] < i) {
            this.swap(chars, i % 2 === 1 ? counter[i] : 0, i);
            counter[i]++;
            i = 0;
            anagrams.push(chars.join(''));
        } else {
            counter[i] = 0;
            i++;
        }
    }

    return anagrams;
  }
}

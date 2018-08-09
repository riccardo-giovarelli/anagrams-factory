import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-anagrams',
  templateUrl: './update-anagrams.component.html',
  styleUrls: ['./update-anagrams.component.css']
})
export class UpdateAnagramsComponent {

  output: string[] =[];

  updateanAgrams = (currentWord : string) : void => {
    if (!this.checkString(currentWord)) return;
    this.output.push(currentWord);
      
      console.log(currentWord.length)
  }

  checkString = (currentString: string) : boolean => {
    if (currentString.length > 10) return false;
    if (!/^[a-z]+$/i.test(currentString)) return false;
    return true;
  }

}

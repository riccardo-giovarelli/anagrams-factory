import { Component } from '@angular/core';

@Component({
  selector: 'current-word',
  templateUrl: './current-word.component.html',
  styleUrls: ['./current-word.component.css']
})
export class CurrentWordComponent {
  
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

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stepbar',
  templateUrl: './stepbar.component.html',
  styleUrls: ['./stepbar.component.scss']
})
export class StepbarComponent {

  constructor() { }

  @Input() showResults: boolean;
  @Input() showDictionary: boolean;
  @Input() showProgressbar: boolean;
  @Input() showSearch: boolean;
  @Output() anagramsChange = new EventEmitter();


  backToSearchAnagrams() {
    if (this.showSearch === false || this.showProgressbar || this.showDictionary || this.showDictionary) {
      this.anagramsChange.emit({
        action: 'reset',
        results: null
      });
    }
  }

  backToAnagramsResults() {
    if ((this.showProgressbar && this.showResults) || this.showDictionary || this.showDictionary) {
      this.anagramsChange.emit({
        action: 'show-results',
        results: null
      });
    }
  }

  backToDictionarySearch() {
    if (this.showDictionary) {
      this.anagramsChange.emit({
        action: 'progressbar',
        results: null
      });
    }
  }
}

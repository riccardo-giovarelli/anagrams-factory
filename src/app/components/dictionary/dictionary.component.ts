import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  constructor() { }

  @Input() words: Array<any>;

  ngOnInit(): void {
  }

}

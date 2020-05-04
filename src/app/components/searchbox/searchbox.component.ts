import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  constructor() {
    this.word = '';
  }

  word: string;

  ngOnInit(): void {
  }


  clear() {
    this.word = '';
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {

  p: number;

  @Input() errorMessage = '';
  @Input() anagrams = [];

  constructor() { }

  // Angular ngOnInit
  ngOnInit() {
    this.p = 1;
  }
}

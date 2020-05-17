import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnChanges {

  donePercent: string;

  @Input() total: number;
  @Input() done: number;

  ngOnChanges(changes: SimpleChanges) {
    this.donePercent = this.getPercent(changes.done.currentValue, this.total);
  }

  getPercent(value: number, total: number): string {
    return (total > 0) ? Math.round((value * 100) / total) + '%' : '0%';
  }
}

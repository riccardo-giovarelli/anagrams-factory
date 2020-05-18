import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnChanges, OnInit {

  donePercent: string;
  componentClass: string;

  @Input() total: number;
  @Input() now: number;
  @Input() min: number;
  @Input() text: string;
  @Input() type: ('success' | 'info' | 'warning' | 'danger' | '');

  // Angular ngOnInit
  ngOnInit() {
    this.componentClass = this.type !== '' ? 'progress-bar bg-' + this.type : 'progress-bar bg-info';
  }

  // Angular ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    this.donePercent = this.getPercent(changes.now.currentValue, this.total);
  }

  // Return progress rate
  getPercent(value: number, total: number): string {
    return (total > 0) ? Math.round((value * 100) / total) + '%' : '0%';
  }
}

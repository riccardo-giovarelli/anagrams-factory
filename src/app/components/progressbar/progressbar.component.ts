// This file is part of Anagrams Factory.

// Anagrams Factory is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Anagrams Factory is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Anagrams Factory.  If not, see <http://www.gnu.org/licenses/>.

// Copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>

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

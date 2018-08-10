import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.css']
})
export class CheckWordsComponent {
  private http: HttpClient;
  baseUrl = 'https://en.wiktionary.org/w/api.php?action=query&titles=ffwfewew';

  getWords (currentWorld: string): any {
    return this.http.get(this.baseUrl + currentWorld);
  }
}

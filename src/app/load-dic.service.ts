import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoadDicService {

  dictonary: string;

  constructor(private http: Http) {
    this.http.get('../assets/dic.json')
    .subscribe(res => {
      this.dictonary = res.text();
    });
  }

  getDictionary = (): string => {
    return this.dictonary;
  }
}

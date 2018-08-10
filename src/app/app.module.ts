import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UpdateAnagramsComponent } from './update-anagrams/update-anagrams.component';
import { CheckWordsComponent } from './check-words/check-words.component'

@NgModule({
  declarations: [
    AppComponent,
    UpdateAnagramsComponent,
    CheckWordsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

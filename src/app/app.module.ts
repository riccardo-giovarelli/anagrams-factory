import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UpdateAnagramsComponent } from './update-anagrams/update-anagrams.component'

@NgModule({
  declarations: [
    AppComponent,
    UpdateAnagramsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

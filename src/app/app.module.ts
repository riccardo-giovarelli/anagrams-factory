import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { ApiService } from './services/api.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SpinnerComponent,
    ResultsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToursComponent } from './tours/tours.component';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './stations/station/station.component';
import { TourComponent } from './tours/tour/tour.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './templates/template/template.component';
import { MediaselectComponent } from './shared components/mediaselect/mediaselect.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    StationsComponent,
    StationComponent,
    TourComponent,
    NotfoundpageComponent,
    TemplatesComponent,
    TemplateComponent,
    MediaselectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

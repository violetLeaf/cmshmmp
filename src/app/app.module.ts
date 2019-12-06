import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToursComponent } from './tours/tours.component';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './stations/station/station.component';
import { TourComponent } from './tours/tour/tour.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './templates/template/template.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    StationsComponent,
    StationComponent,
    TourComponent,
    TemplatesComponent,
    TemplateComponent,
    NotfoundpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

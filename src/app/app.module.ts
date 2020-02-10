import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from './_modal';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToursComponent } from './tours/tours.component';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './stations/station/station.component';
import { TourComponent } from './tours/tour/tour.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './templates/template/template.component';
import { MediaselectComponent } from './tours/tour/mediaselect/mediaselect.component';
import { AreasComponent } from './areas/areas.component';
import { AreaComponent } from './areas/area/area.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageComponent } from './languages/language/language.component';

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
    MediaselectComponent,
    AreasComponent,
    AreaComponent,
    LanguagesComponent,
    LanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

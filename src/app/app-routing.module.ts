import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './stations/station/station.component';
import { ToursComponent } from './tours/tours.component';
import { TourComponent } from './tours/tour/tour.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './templates/template/template.component';
import { AreasComponent } from './areas/areas.component';
import { AreaComponent } from './areas/area/area.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageComponent } from './languages/language/language.component';
import { MediaspaceComponent } from './mediaspace/mediaspace.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: ToursComponent},
  {path: 'tours/tour', component: TourComponent},
  {path: 'stations', component: StationsComponent},
  {path: 'stations/station', component: StationComponent},
  {path: 'templates', component: TemplatesComponent},
  {path: 'templates/template', component: TemplateComponent},
  {path: 'areas', component: AreasComponent},
  {path: 'areas/area', component: AreaComponent},
  {path: 'languages', component: LanguagesComponent},
  {path: 'languages/language', component: LanguageComponent},
  {path: 'mediaspace', component: MediaspaceComponent},
  {path: '**', component: NotfoundpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

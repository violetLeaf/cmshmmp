import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsComponent } from './stations/stations.component';
import { StationComponent } from './stations/station/station.component';
import { ToursComponent } from './tours/tours.component';
import { TourComponent } from './tours/tour/tour.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './templates/template/template.component';
import { MediaselectComponent } from './shared components/mediaselect/mediaselect.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: ToursComponent},
  {path: 'tours/tour', component: TourComponent},
  {path: 'stations', component: StationsComponent},
  {path: 'stations/station', component: StationComponent},
  {path: 'templates', component: TemplatesComponent},
  {path: 'templates/template', component: TemplateComponent},
  {path: 'mediaselect', component: MediaselectComponent},
  {path: '**', component: NotfoundpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { TourComponent } from '../tour/tour.component';
import TourModel from 'src/app/shared/tour.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';

@Injectable({
  providedIn: 'root'
})
export class TourservicesService {

  constructor(private router: Router, private http: HttpClient) {}

  public getallStations(id:number): StationModel[]{
    let tours;

    this.http.get<StationModel[]>("http://localhost:3000/stationsfortour/" + id).subscribe(function(res) {
      tours = res;
   }.bind(this));

    return tours;
  }
}
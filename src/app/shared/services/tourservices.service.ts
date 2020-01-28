import { Injectable } from '@angular/core';
import { TourComponent } from '../../tours/tour/tour.component';
import TourModel from 'src/app/shared/tour.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from '../media.model';

@Injectable({
  providedIn: 'root'
})
export class TourservicesService {

  constructor(private router: Router, private http: HttpClient) {}

  public getallTours(): TourModel[]{
    let tours:TourModel[] = null;

    // funktioniert nicht
    // this.http.get<TourModel[]>("http://localhost:3000/tours").subscribe(function(res) {
    //    this.toursarray=res;
    //   //  console.log(this.toursarray);
    // }.bind(this));

    return tours;
  }

  public getallStationsforTour(id:number): StationModel[]{
    let stations:StationModel[] = null;

    // this.http.get<StationModel[]>("http://localhost:3000/stationsfortour/" + id).subscribe(function(res) {
    //   this.currentStations = res;
    //   console.log(station); // this returns what i need
    // }.bind(this));
      
    // console.log(station); // this returns undefined

    return stations;
  }

  public getallMediasforTour(id:number): MediaModel[]{
    let medias:MediaModel[] = null;

    this.http.get<MediaModel[]>("http://localhost:3000/mediasforstationsfortour/" + id).subscribe(
      (res) => {
        medias = res;
    });

    return medias;
  }
}
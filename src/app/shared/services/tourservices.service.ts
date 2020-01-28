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

    tours = [{ 
      id: 1,
      title: "Tour A",
      reversible: false,
      guide: "Max Mustermann",
      date: new Date(2020, 1, 30, 11, 11)
    },
    { 
      id: 2,
      title: "Tour B",
      reversible: true,
      guide: "Max 2",
      date: new Date(2020, 2, 25, 1, 11)
    },
    { 
      id: 3,
      title: "Tour C",
      reversible: false,
      guide: "Max 3",
      date: new Date(2020, 1, 31, 20, 11)
    },
    { 
      id: 4,
      title: "Tour D",
      reversible: true,
      guide: "Max 4",
      date: new Date(2020, 2, 20, 9, 11)
    },
    { 
      id: 5,
      title: "Tour E",
      reversible: false,
      guide: "Max 5",
      date: new Date(2020, 3, 30, 11, 11)
    },
  ];

    return tours;
  }

  public getallStationsforTour(id:number): StationModel[]{
    let stations:StationModel[] = null;

    // this.http.get<StationModel[]>("http://localhost:3000/stationsfortour/" + id).subscribe(function(res) {
    //   this.currentStations = res;
    //   console.log(station); // this returns what i need
    // }.bind(this));
      
    // console.log(station); // this returns undefined

    stations = [{ 
      id: 1,
      name: "Station A",
      area_id: 1,
      ordernumber: 1,
    },
    { 
      id: 2,
      name: "Station B",
      area_id: 1,
      ordernumber: 1,
    },
    { 
      id: 3,
      name: "Station C",
      area_id: 1,
      ordernumber: 1,
    },
  ];

    return stations;
  }

  public getallMediasforTour(id:number): MediaModel[]{
    let medias:MediaModel[] = null;

  //   this.http.get<MediaModel[]>("http://localhost:3000/mediasforstationsfortour/" + id).subscribe(function(res) {
  //     this.currentMedias = res;
  //     console.log(res);
  //  }.bind(this));
  //  console.log(medias);

    medias = [{ 
      id: 1,
      caption: "Media A",
      language_id: 1,
      station_id: 1,
      text: "Dies ist ein Text A"
    },{ 
      id: 2,
      caption: "Media B",
      language_id: 1,
      station_id: 1,
      text: "Dies ist ein Text B"
    },{ 
      id: 3,
      caption: "Media C",
      language_id: 1,
      station_id: 1,
      text: "Dies ist ein Text C"
    },
  ];

    return medias;
  }
}
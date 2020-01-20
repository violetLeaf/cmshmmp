import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import StationModel from '../shared/station.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  
  examplestationarray = [
    {id: 1, name: "Station XY"},
    {id: 2, name: "Station YX"},
    {id: 3, name: "Station ZZ"},
    {id: 4, name: "Maschine A"},
    {id: 5, name: "Maschine B"},
    {id: 6, name: "Information Table"}
  ];

  stationsarray: StationModel[] = [];

  constructor(private router: Router, private http: HttpClient) {
     this.http.get<StationModel[]>("http://localhost:3000/stations").subscribe(function(res) {
      this.stationsarray=res;
   }.bind(this));
  }

  ngOnInit() {
    
  }

  onStationClick(station: any) {
    // this.router.navigate(['stations/station'], {state: {data: {station}}});
    this.http.post<StationModel>("http://localhost:3000/poststation", this.stationsarray[0]).subscribe(
      function(res){
        console.log(res);
      }
    )
  }

  public get sortedStations(){
    return this.stationsarray.sort((a, b)=> {return a.id - b.id});
  }
}

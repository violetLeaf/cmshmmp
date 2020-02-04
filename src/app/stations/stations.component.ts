import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import StationModel from '../shared/station.model';
import { HttpClient } from '@angular/common/http';
import AreaModel from '../shared/area.model';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  station: StationModel[] = [{
    id : 1,
    name: "Station A",
    area_id: 1,
    ordernumber: 1
  },{
    id : 2,
    name: "Station B",
    area_id: 1,
    ordernumber: 1
  }
]
  areas: AreaModel[] = [];
  stationsarray: StationModel[] = [];
  standardStation: StationModel = {
    id: -1,
    name: "Standard Station",
    area_id: 1,
    ordernumber: (Math.random() * 100000)
  }

  constructor(private router: Router, private http: HttpClient) {
     this.http.get<StationModel[]>("http://localhost:3000/stations").subscribe(function(res) {
      this.stationsarray = res;
   }.bind(this));

    this.http.get<AreaModel[]>("http://localhost:3000/areas").subscribe((res) => {
      this.areas = res;
    });
  }

  ngOnInit() {  }

  onStationClick(station: StationModel) {

    this.router.navigate(['stations/station'], {state: {data: {station}}});
  }

  public get sortedStations(){
    if (this.station != null)
      return this.station.sort((a, b)=> {return a.id - b.id});
    else
      return null;
  }
  public get sortedArea(){
    if (this.areas != null)
      return this.areas.sort((a, b)=> {return a.position - b.position});
    else
      return null;
  }
}

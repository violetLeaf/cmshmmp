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
  areas: AreaModel[] = [];
  stationsarray: StationModel[] = [];
  stationstoshow: StationModel[] = [];
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
    if (this.stationsarray != null)
      return this.stationsarray.sort((a, b)=> {return a.id - b.id});
    else
      return null;
  }
  public get StationsToShow(){
    if (+(<HTMLOptionElement>document.getElementById("area")[(<HTMLSelectElement>document.getElementById("area")).selectedIndex]).id == -1)
      return this.sortedStations;
    else
      return this.stationstoshow;
  }
  public get sortedArea(){
    if (this.areas != null)
      return this.areas.sort((a, b)=> {return a.position - b.position});
    else
      return null;
  }

  onareaselected(areas:any){
    // var index = (<HTMLSelectElement>document.getElementById("area")).selectedIndex;
    var id = +(<HTMLOptionElement>document.getElementById("area")[(<HTMLSelectElement>document.getElementById("area")).selectedIndex]).id;

    this.stationstoshow = [];
    this.sortedStations.forEach(e => {
      if (e.area_id == id){
        this.stationstoshow.push(e);
      }
    });
  }
}

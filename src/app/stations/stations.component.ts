import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  onStationClick(station: any) {
    this.router.navigate(['stations/station'], {state: {data: {station}}});
  }

  public get sortedStations(){
    return this.examplestationarray.sort((a, b)=> {return a.id - b.id});
  }
}

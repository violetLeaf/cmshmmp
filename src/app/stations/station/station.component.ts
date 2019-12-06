import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  exampleMediaArray = [
    {id: 1, type: "text", name: "Text XY"},
    {id: 2, type: "picture", name: "picture XY"},
    {id: 3, type: "video", name: "video XY"},
  ];

  currentStation: any;

  constructor(private router: Router) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentStation = stateData.station;
    } else {
      this.router.navigate(['']);
    }
   }

  ngOnInit() {
  }
  
  public get sortedMedia(){
    return this.exampleMediaArray.sort((a, b)=> {return a.id - b.id});
  }
}

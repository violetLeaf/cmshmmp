import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  currentTour: any;

  examplestationarray = [
    {id: 1, name: "Station XY"},
    {id: 2, name: "Station YX"},
    {id: 3, name: "Station ZZ"},
    {id: 4, name: "Maschine A"},
    {id: 5, name: "Maschine B"},
    {id: 6, name: "Information Table"}
  ];

  constructor(private router: Router) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      // die mitgegebene Tour
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  onStationClick(tour: any) {
    this.router.navigate(['tours/tour'], {state: {data: {tour}}});
    console.log(tour);
  }

  public get sortedStations(){
    return this.examplestationarray.sort((a, b)=> {return a.id - b.id});
  }
}

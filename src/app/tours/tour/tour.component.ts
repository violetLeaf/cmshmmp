import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  currentTour: any;
  temps: any;

  constructor(private router: Router) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  onStationClick(tour: any) {
    this.router.navigate(['stations/station'], {state: {data: {tour}}});
    console.log(tour);
  }

  public get sortedStations(){
    return this.currentTour.sort((a, b)=> {return a.id - b.id});
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import TourModel from 'src/app/shared/tour.model';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  currentTour: any;
  zwtableinfos: any;
  temps: any;

  constructor(private router: Router, private http: HttpClient) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }

    // noch testen
    this.http.post("http://localhost:3000/posttour",
      [this.currentTour, this.zwtableinfos])
      .subscribe(function(res) {
       this.toursarray=res;
      //  console.log(this.toursarray);
    }.bind(this));
  }

  ngOnInit() {
  }

  public get sortedStations(){
    // return this.currentTour.stations.sort((a, b)=> {return a.id - b.id});
    return null;
  }

  save(){
    if (this.currentTour == null){
      // Create here
    }
    else if (this.currentTour != null){
      // Update here

    }
  }
}

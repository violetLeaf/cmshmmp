import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import TourModel from '../shared/tour.model';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  toursarray: TourModel[] = [];
  standardTour: TourModel= {
    id: -1,
    title: null,
    reversible: false,
    date: null
  };

  constructor(private router: Router, private http: HttpClient) {
    this.http.get<TourModel[]>("http://localhost:3000/tours").subscribe(function(res) {
       this.toursarray=res;
      //  console.log(this.toursarray);
    }.bind(this));
  }

  ngOnInit() {
    
  }

  onTourClick(tour: any) {
    this.router.navigate(['tours/tour'], {state: {data: {tour}}});
  }

  public get sortedTours(){
    return this.toursarray.sort((a, b)=> {return a.id - b.id});
  }

  // this.http.post<TourModel>("http://localhost:3000/posttour", this.toursarray[0]).subscribe(
  //     function(res){
  //       console.log(res);
  //     }
    // )
}

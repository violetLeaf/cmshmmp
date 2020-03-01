import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import TourModel from '../shared/tour.model';
import { TourservicesService } from '../shared/services/tourservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  toursarray: TourModel[] = [];
  standardTour: TourModel= {
    id: -1,
    title: "Standard Tour",
    reversible: false,
    date: new Date()
  };

  constructor(private router: Router, private http: HttpClient, private tourService: TourservicesService) {
    this.http.get<TourModel[]>(environment.localurl + "tours").subscribe(function(res) {
       this.toursarray = res;
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

  createZIPtours(){
    let alltours = this.toursarray;
    let http2 = this.http;

    this.http.delete(environment.localurl + "deletetoursapp").subscribe(function(res){
      alltours.forEach(tour => {
        // create the zip-file
        http2.get(environment.localurl + "tourapp/" + tour.id).subscribe(function(res){
          console.log(res);
        });
      });
    });
  }
}

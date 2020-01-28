import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import TourModel from 'src/app/shared/tour.model';
import { DatePipe } from '@angular/common';
import StationModel from 'src/app/shared/station.model';
import { TourservicesService } from '../../shared/services/tourservices.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  currentTour: TourModel;
  currentStations: StationModel[];
  zwtableinfos: any;
  temps: any;

  constructor(private router: Router, private http: HttpClient, private tourService: TourservicesService) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }

  this.currentStations = tourService.getallStationsforTour(this.currentTour.id);
}

  ngOnInit() {
  }

  public get sortedStations(){
    return this.currentStations.sort((a, b)=> {return a.ordernumber - b.ordernumber});
    // return null;
  }

  dateformated(){
    let pipe = new DatePipe('en-US');

    let minDate = this.currentTour.date;
    let v = pipe.transform(minDate, 'yyyy-MM-ddThh:mm');
    return v;
  }

  onStationClick(station:any){
    this.router.navigate(['mediaselect'], {state: {data: {station}}});
  }

  save(){
    try{
      this.currentTour = {
        id : this.currentTour.id,
        title : (<HTMLInputElement>document.getElementById("title")).value,
        date: new Date((<HTMLInputElement>document.getElementById("date")).value),
        guide: (<HTMLInputElement>document.getElementById("guide")).value,
        reversible: (<HTMLInputElement>document.getElementById("reversible")).checked,
        template_id: null
      };

      this.zwtableinfos = {
        station_id: 2,
        media_id: 2,
        ordernumber: (this.currentTour.id + (Math.random() * 1000000))
      };

      // console.log(this.currentTour);
      // console.log((<HTMLInputElement>document.getElementById("reversible")).checked);

      if (this.currentTour.id == -1){
        this.http.post("http://localhost:3000/posttour",
          [this.currentTour, this.zwtableinfos])
          .subscribe(function(res) {
           this.currentTour=res;
        }.bind(this));

        
        // this.zwtableinfos.forEach(e => {
        //   this.http.post("http://localhost:3000/posttourstations", e).subscribe(function(res) {
        //     this.currentTour=res;
        //   }.bind(this));
        // });
        
        alert("New Tour created.");

        this.router.navigate(['']);
      }
      else if (this.currentTour.id != -1){
        console.log("Tour überarbeiten");
      }
    }
    catch(err){
      console.log("an error occured: " + err);
    }
  }

  // create service for delete
  delete(){
    console.log(this.currentTour.id);
    if (!isNaN(this.currentTour.id)){
      const httpOpt = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "tour", "id" : this.currentTour.id}
      };
      this.http.delete("http://localhost:3000/delete", httpOpt).subscribe(function(res){
        this.currentTour = res;
      }.bind(this));
      this.router.navigate(['']);
    }
    else{
      console.log("An error occured when trying to delete.");
    }
  }
}

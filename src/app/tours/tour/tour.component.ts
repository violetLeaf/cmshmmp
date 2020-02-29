import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import TourModel from 'src/app/shared/tour.model';
import { DatePipe } from '@angular/common';
import StationModel from 'src/app/shared/station.model';
import { TourservicesService } from 'src/app/shared/services/tourservices.service';
import { ModalService } from 'src/app/_modal';
import LanguageModel from 'src/app/shared/language.model';
import MediaModel from 'src/app/shared/media.model';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  currentTour: TourModel;
  currentStations: StationModel[];
  allStations: StationModel[] = null;

  // selectedStations: StationModel[] = null;
  // notselectedStations: StationModel[] = null;

  languages: LanguageModel[];
  zwtableinfos: any;
  temps: any;

  constructor(private router: Router, private http: HttpClient, private tourService: TourservicesService, private modalService: ModalService) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }

    this.http.get<StationModel[]>("http://localhost:3000/stationsfortour/" + 
        this.currentTour.id).subscribe((res) => {
        this.currentStations = res;
        console.log(this.currentStations);
    });

    this.http.get<StationModel[]>("http://localhost:3000/stations").subscribe((res) => {
      this.allStations = res;

      this.allStations.forEach(station => {
        station.selected = this.currentStations.includes(station);
      });
    });

    this.http.get<LanguageModel[]>("http://localhost:3000/languages").subscribe((res) => {
      this.languages = res;
    });

  // this.currentStations = tourService.getallStationsforTour(this.currentTour.id);
}

  ngOnInit() {  }

  public get sortedStations(){
    if (this.currentStations != null)
      return this.currentStations.sort((a, b)=> {return a.ordernumber - b.ordernumber});
    else
      return null;
  }

  // public get formattedStations(){
  //   if (this.allStations != null && this.currentStations == null){
  //     for(var i = 0; i < this.allStations.length; i++){
  //       for(var ii = 0; ii < this.currentStations.length; ii++){
  //         if (this.allStations[i].id == this.currentStations[i].id)
  //           this.selectedStations.push(this.allStations[i]);
  //         else
  //           this.notselectedStations.push(this.allStations[i]);
  //       }
  //     }
  //     console.log("sel and not sel");
  //     return this.selectedStations;
  //   }
  //   else if (this.currentStations == null)
  //     return this.allStations;
  //   else
  //     return null;
  // }

  dateformated(){
    let pipe = new DatePipe('en-US');

    let minDate = this.currentTour.date;
    let v = pipe.transform(minDate, 'yyyy-MM-ddThh:mm');
    return v;
  }

  onStationClick(station:StationModel, tour:TourModel){
    this.router.navigate(['mediaselect'], {state: {data: {station, tour}}});
  }

  openmodal(){
    this.modalService.open("ov_stations");
  }

  closemodal(){
    this.currentStations.splice(0, this.currentStations.length);

    this.allStations.forEach(station => {
      if (station.selected){
        this.currentStations.push(station);
      }
    });

    console.log(this.currentStations);
    this.modalService.close("ov_stations");
  }

  // IsSelected(station){
  //   return this.currentStations.includes(station);
  // }

  onstationclick(station){
    station.selected = !station.selected;
    console.log(station);
  }
  
  move(direction:string, pos:number){
    if (direction == "up"){
      console.log("move up: " + pos);
    }
    else if (direction == "down"){
      console.log("move down: " + pos);
    }
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

      // console.log(this.currentTour);
      // console.log((<HTMLInputElement>document.getElementById("reversible")).checked);

      if(this.currentTour.title != "" && this.currentTour.title != null && this.currentTour.date != undefined && this.currentTour.reversible != undefined){

        var id:number;
        var medias:MediaModel[];

        if (this.currentTour.id == -1){
          // {"title": this.currentTour.title, "reversible": this.currentTour.reversible, "template_id": this.currentTour.template_id, "guide": this.currentTour.guide, "date": this.currentTour.date}
          this.http.post("http://localhost:3000/posttour",
            {"title": this.currentTour.title, "reversible": this.currentTour.reversible, "template_id": this.currentTour.template_id, "guide": this.currentTour.guide, "date": this.currentTour.date})
            .subscribe(function(res) {

            this.currentTour=res;

            id = res.insertId;

            for(var i = 0; i < this.currentStations.length; i++){
              // ignorieren, funktioniert
              this.http.get<MediaModel[]>("http://localhost:3000/mediasforstation/" + this.currentStations[i].id).subscribe((res) => {
                medias = res;

                for (var j = 0; j < medias.length; j++){
                  this.http.post("http://localhost:3000/posttourstations",
                  // TODO: API anpassen; dass Station_ID aus der Datenbank geholt wird, bevor ZW-Eintrag erfolgt
                  {"tour_id": id,  "media_id": medias[j].id, "ordernumber": (i*j)}).subscribe(function(res) {
                    console.log(res);
                  }.bind(this));
                }
              });
            }
          }.bind(this));
          
          alert("New Tour created.");
          this.router.navigate(['']);
        }
        else if (this.currentTour.id != -1){
          console.log("Tour überarbeiten");
        }
      }
      else
        alert("Eingaben überprüfen!");
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

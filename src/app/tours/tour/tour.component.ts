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
  
  currentMedias: MediaModel[] = null;
  allavailableMedia: MediaModel[];

  languages: LanguageModel[];

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

      this.http.get<StationModel[]>("http://localhost:3000/stations").subscribe((res) => {
        this.allStations = res;

        this.allStations.forEach(station => {
          station.selected = this.currentStations.includes(station);
        });

        console.log(this.currentStations);
        console.log(this.allStations);
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

  dateformated(){
    let pipe = new DatePipe('en-US');

    let minDate = this.currentTour.date;
    let v = pipe.transform(minDate, 'yyyy-MM-ddThh:mm');
    return v;
  }

  openmodal(){
    this.modalService.open("ov_stations");
  }

  closemodal(){
    this.currentStations.splice(0, this.currentStations.length);
    var i = 0;

    this.allStations.forEach(station => {
      if (station.selected){
        station.ordernumber = i++;
        this.currentStations.push(station);
      }
    });

    console.log(this.currentStations);
    this.modalService.close("ov_stations");
  }

  IsSelected(station){
    return this.currentStations.includes(station);
  }

  onstationclick(station){
    station.selected = !station.selected;
  }

  openmodal_media(stationid){
    this.modalService.open("ov_medias");

    this.http.get<MediaModel[]>("http://localhost:3000/mediasforstationsfortour/" + stationid + "/" + this.currentTour.id).subscribe((res) => {
      this.currentMedias = res;       

      this.http.get<MediaModel[]>("http://localhost:3000/mediasforstation/" + stationid).subscribe((res) => {
        this.allavailableMedia = res;
      });
    });
  }

  closemodal_media(){
    this.modalService.close("ov_medias");
  }

  public get sortedMedia(){
    if (this.allavailableMedia != null){

      return this.allavailableMedia.sort((a, b)=> {return a.id - b.id});
    }
    else
      return null;
  }
  
  onmediaclick(media){
    media.active = !media.active;
  }

  move(direction:string, station:StationModel){
    station.id = (station.id != undefined ? station.id : station.station_id);
    if ((direction == "up" && station.ordernumber != 0) || (direction == "down" && station.ordernumber < this.currentStations.length - 1)){
      this.http.put("http://localhost:3000/updatetourstationpos",
        {"direction": direction, "tour_id": this.currentTour.id, "station_id": station.id, "ordernumber": station.ordernumber}).subscribe(function(res) {
        console.log(res);
      }.bind(this));
    }
  }

  save(){
    try{
      var e = (<HTMLSelectElement>document.getElementById("language"));
      this.currentTour = {
        id : this.currentTour.id,
        title : (<HTMLInputElement>document.getElementById("title")).value,
        date: new Date((<HTMLInputElement>document.getElementById("date")).value),
        guide: (<HTMLInputElement>document.getElementById("guide")).value,
        reversible: (<HTMLInputElement>document.getElementById("reversible")).checked,
        template_id: null,
        language_id: +e.options[e.selectedIndex].id
      };

      // console.log(this.currentTour);

      if(this.currentTour.title != "" && this.currentTour.title != null && this.currentTour.date != undefined && this.currentTour.reversible != undefined){

        var id:number = this.currentTour.id;
        var medias:MediaModel[];

        if (this.currentTour.id == -1){
          this.http.post("http://localhost:3000/posttour", this.currentTour)
            .subscribe(function(res) {

            this.currentTour=res;

            id = res.insertId;

            for(let i = 0; i < this.currentStations.length; i++){
              this.http.get("http://localhost:3000/mediasforstation/" + this.currentStations[i].id).subscribe((res) => {
                medias = res;

                for (let j = 0; j < medias.length; j++){
                  this.http.post("http://localhost:3000/posttourstations",
                  {"tour_id": id,  "media_id": medias[j].id, "ordernumber": this.currentStations[i].ordernumber}).subscribe(function(res) {
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
          this.http.put("http://localhost:3000/updatetour", this.currentTour).subscribe(function(res) {
            console.log(res);
            this.currentTour = res;
          }.bind(this));

          const httpOpt = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "tourzw", "id" : this.currentTour.id}
          };
          this.http.delete("http://localhost:3000/delete", httpOpt).subscribe(function(res){

            for(var i = 0; i < this.currentStations.length; i++){
              this.http.get("http://localhost:3000/mediasforstation/" + this.currentStations[i].id).subscribe((res) => {
                medias = res;

                for (var j = 0; j < medias.length; j++){
                  this.http.post("http://localhost:3000/posttourstations",
                  {"tour_id": id,  "media_id": medias[j].id, "ordernumber": (i)}).subscribe(function(res) {
                    console.log(res);
                  }.bind(this));
                }
              });
            }
          }.bind(this));

          alert("Tour updated.");
          this.router.navigate(['']);
        }
      }
      else
        alert("Eingaben überprüfen!");
    }
    catch(err){
      console.log("an error occured: " + err);
    }
  }

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

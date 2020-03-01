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
import { environment } from 'src/environments/environment';
import TemplateModel from 'src/app/shared/template.model';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  currentTour: TourModel;

  currentStations: StationModel[];
  allStations: StationModel[] = null;
  openStation: StationModel;
  
  currentMedias: MediaModel[] = null;
  allavailableMedia: MediaModel[];

  languages: LanguageModel[];
  templates: TemplateModel[];

  constructor(private router: Router, private http: HttpClient, private tourService: TourservicesService, private modalService: ModalService) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }

    this.http.get<StationModel[]>(environment.localurl + "stationsfortour/" + 
    this.currentTour.id).subscribe((res) => {
      this.currentStations = res;

      this.http.get<StationModel[]>(environment.localurl + "stations").subscribe((res) => {
        this.allStations = res;

        for(let i = 0; i < this.allStations.length; i++){
          for(let j = 0; j < this.currentStations.length; i++){
            if(this.allStations[i].id == this.currentStations[j].id)
              this.allStations[i].selected = true;
            else if (this.allStations[i].id != this.currentStations[j].id && !this.allStations[i].selected)
              this.allStations[i].selected = false;
          }
        }

        console.log(this.currentStations);
        console.log(this.allStations);
      });
    });

    this.http.get<LanguageModel[]>(environment.localurl + "languages").subscribe((res) => {
      this.languages = res;
    });

    this.http.get<TemplateModel[]>(environment.localurl + "templates").subscribe((res) => {
      this.templates = res;
    });
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

    this.modalService.close("ov_stations");
  }

  // IsSelected(station){
  //   return this.currentStations.includes(station);
  // }

  onstationclick(station){
    station.selected = !station.selected;
  }

  openmodal_media(station){
    if (this.currentTour.id != -1){
      this.modalService.open("ov_medias");
      this.openStation = station;
      this.http.get<MediaModel[]>(environment.localurl + "mediasforstationsfortour/" + station.id + "/" + this.currentTour.id).subscribe((res) => {
        this.currentMedias = res;

        this.http.get<MediaModel[]>(environment.localurl + "mediasforstation/" + station.id).subscribe((res) => {
          this.allavailableMedia = res;
          var e = (<HTMLSelectElement>document.getElementById("language"));
  
          if(+e.options[e.selectedIndex].id != -1){
            for (let i = 0; i < this.allavailableMedia.length; i++){
              if (this.allavailableMedia[i].language_id != +e.options[e.selectedIndex].id){
                this.allavailableMedia.splice(i, 1);
              }
            }
          }
        });
      });
    }
    else
      alert("Please save Tour before trying to select Medias.");
  }

  closemodal_media(){
    this.currentMedias.splice(0, this.currentMedias.length);

    this.allavailableMedia.forEach(media => {
      if (media.active){
        this.currentMedias.push(media);
      }
    });

    const httpOpt = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "tourzwmedia", "id" : this.openStation.id}
    };
    this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){
      for (let j = 0; j < this.currentMedias.length; j++){
        this.http.post(environment.localurl + "posttourstations",
          {"tour_id": this.currentTour.id,  "media_id": this.currentMedias[j].id, "ordernumber": this.openStation.ordernumber}
          ).subscribe(function(res) {
            console.log(res);
        }.bind(this));
      }
      this.openStation = null;
    }.bind(this));

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
      this.http.put(environment.localurl + "updatetourstationpos",
        {"direction": direction, "tour_id": this.currentTour.id, "station_id": station.id, "ordernumber": station.ordernumber}).subscribe(function(res) {
        console.log(res);
      }.bind(this));
    }
  }

  ontemplateclick(template:TemplateModel){
    if (this.currentTour.template_id != template.id){
      this.currentTour.template_id = template.id;

      this.http.get<StationModel[]>(environment.localurl + "stationsfortemplate/" + template.id).subscribe((res) => {
        this.currentStations = res;
      });
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
        template_id: this.currentTour.template_id,
        language_id: +e.options[e.selectedIndex].id
      };

      // console.log(this.currentTour);

      if(this.currentTour.title != "" && this.currentTour.title != null && this.currentTour.date != undefined && this.currentTour.reversible != undefined){

        var id:number = this.currentTour.id;
        var medias:MediaModel[];

        if (this.currentTour.id == -1){
          this.http.post(environment.localurl + "posttour", this.currentTour)
            .subscribe(function(res) {

            this.currentTour=res;

            id = res.insertId;

            for(let i = 0; i < this.currentStations.length; i++){
              this.http.get(environment.localurl + "mediasforstation/" + this.currentStations[i].id).subscribe((res) => {
                medias = res;

                for (let j = 0; j < medias.length; j++){
                  this.http.post(environment.localurl + "posttourstations",
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
          this.http.put(environment.localurl + "updatetour", this.currentTour).subscribe(function(res) {
            console.log(res);
            this.currentTour = res;
          }.bind(this));

          const httpOpt = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "tourzw", "id" : this.currentTour.id}
          };
          this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){

            for(var i = 0; i < this.currentStations.length; i++){
              this.http.get(environment.localurl + "mediasforstation/" + this.currentStations[i].id).subscribe((res) => {
                medias = res;

                for (var j = 0; j < medias.length; j++){
                  this.http.post(environment.localurl + "posttourstations",
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
      this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){
        this.currentTour = res;
      }.bind(this));

      alert("Template deleted.");
      this.router.navigate(['']);
    }
    else{
      console.log("An error occured when trying to delete.");
    }
  }
}

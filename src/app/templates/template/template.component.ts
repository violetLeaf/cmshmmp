import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from 'src/app/shared/media.model';
import LanguageModel from 'src/app/shared/language.model';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  currentTemplate: any;

  currentStations: StationModel[];
  allStations: StationModel[] = null;
  openStation: StationModel;
  
  currentMedias: MediaModel[] = null;
  allavailableMedia: MediaModel[];

  languages: LanguageModel[];

  constructor(private router: Router, private http: HttpClient, private modalService: ModalService) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined)
      this.currentTemplate = stateData.template;
    else
      this.router.navigate(['']);

    this.http.get<StationModel[]>(environment.localurl + "stationsfortemplate/" + 
      this.currentTemplate.id).subscribe((res) => {
      this.currentStations = res;

      this.http.get<StationModel[]>(environment.localurl + "stations").subscribe((res) => {
        this.allStations = res;
      });
    });

    this.http.get<LanguageModel[]>(environment.localurl + "languages").subscribe((res) => {
      this.languages = res;
    });
  }

  ngOnInit() {
  }

  public get sortedStations(){
    if (this.currentStations != null)
      return this.currentStations.sort((a, b)=> {return a.ordernumber - b.ordernumber});
    else
      return null;
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

  onstationclick(station){
    station.selected = !station.selected;
  }

  openmodal_media(station){
    if (this.currentTemplate.id != -1){
      this.modalService.open("ov_medias");
      this.openStation = station;
      this.http.get<MediaModel[]>(environment.localurl + "mediasforstationsfortemplate/" + station.id + "/" + this.currentTemplate.id).subscribe((res) => {
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
      alert("Please save Template before trying to select Medias.");
  }

  closemodal_media(){
    this.currentMedias.splice(0, this.currentMedias.length);

    this.allavailableMedia.forEach(media => {
      if (media.active){
        this.currentMedias.push(media);
      }
    });

    const httpOpt = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "templatezwmedia", "id" : this.openStation.id}
    };
    this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){
      for (let j = 0; j < this.currentMedias.length; j++){
        this.http.post(environment.localurl + "posttemplatestations",
          {"template_id": this.currentTemplate.id,  "media_id": this.currentMedias[j].id, "ordernumber": this.openStation.ordernumber}
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
      this.http.put(environment.localurl + "updatetemplatestationpos",
        {"direction": direction, "template_id": this.currentTemplate.id, "station_id": station.id, "ordernumber": station.ordernumber}).subscribe(function(res) {
        console.log(res);
      }.bind(this));
    }
  }

  save(){
    try{
      var e = (<HTMLSelectElement>document.getElementById("language"));
      this.currentTemplate = {
        id : this.currentTemplate.id,
        title : (<HTMLInputElement>document.getElementById("title")).value
      };


      if(this.currentTemplate.title != "" && this.currentTemplate.title != null){

        var id:number = this.currentTemplate.id;
        var medias:MediaModel[];

        if (this.currentTemplate.id == -1){
          this.http.post(environment.localurl + "posttemplate", this.currentTemplate)
            .subscribe(function(res) {

            this.currentTemplate = res;
            id = res.insertId;

            for(let i = 0; i < this.currentStations.length; i++){
              this.http.get(environment.localurl + "mediasforstation/" + this.currentStations[i].id).subscribe((res) => {
                medias = res;

                for (let j = 0; j < medias.length; j++){
                  this.http.post(environment.localurl + "posttemplatestations",
                  {"template_id": id,  "media_id": medias[j].id, "ordernumber": this.currentStations[i].ordernumber}).subscribe(function(res) {
                    console.log(res);
                  }.bind(this));
                }
              });
            }
          }.bind(this));
          
          alert("New Template created.");
          this.router.navigate(['']);
        }
        else if (this.currentTemplate.id != -1){
          this.http.put(environment.localurl + "updatetemplate", this.currentTemplate).subscribe(function(res) {
            console.log(res);
            this.currentTemplate = res;
          }.bind(this));

          const httpOpt = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "templatezw", "id" : this.currentTemplate.id}
          };
          this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){

            for(let i = 0; i < this.currentStations.length; i++){
              this.http.get(environment.localurl + "mediasforstation/" + this.currentStations[i].id).subscribe((res) => {
                medias = res;

                for (let j = 0; j < medias.length; j++){
                  this.http.post(environment.localurl + "posttemplatestations",
                  {"template_id": id,  "media_id": medias[j].id, "ordernumber": (i)}).subscribe(function(res) {
                    console.log(res);
                  }.bind(this));
                }
              });
            }
          }.bind(this));

          alert("Template updated.");
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
    console.log(this.currentTemplate.id);
    if (!isNaN(this.currentTemplate.id)){
      const httpOpt = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "template", "id" : this.currentTemplate.id}
      };
      this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){
        this.currentTemplate = res;
      }.bind(this));

      alert("Template deleted.");
      this.router.navigate(['']);
    }
    else{
      console.log("An error occured when trying to delete.");
    }
  }
}

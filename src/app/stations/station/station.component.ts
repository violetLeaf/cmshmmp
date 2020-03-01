import { Component, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from 'src/app/shared/media.model';
import AreaModel from 'src/app/shared/area.model';
import { ModalService } from 'src/app/_modal';
import LanguageModel from 'src/app/shared/language.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  currentstation: StationModel;
  media: MediaModel[];
  areas: AreaModel[];
  languages: LanguageModel[];
  tosavemedias: MediaModel[] = [];

  constructor(private router: Router, private http: HttpClient, private modalService : ModalService) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentstation = stateData.station;
    } else {
      this.router.navigate(['']);
    }

    if (this.currentstation.id != -1){
      this.http.get<MediaModel[]>(environment.localurl + "mediasforstation/" + this.currentstation.id).subscribe((res) => {
        this.media = res;
      });
    }

    this.http.get<AreaModel[]>(environment.localurl + "areas").subscribe((res) => {
      this.areas = res;
    });
    this.http.get<LanguageModel[]>(environment.localurl + "languages").subscribe((res) => {
      this.languages = res;
    });
   }

  ngOnInit() {
  }
  
  public get sortedMedia(){
    if (this.media != null)
      return this.media.sort((a, b)=> {return a.id - b.id});
    else if (this.tosavemedias != null)
      return this.tosavemedias;
    else
      return null;
  }

  public get sortedArea(){
    if (this.areas != null)
      return this.areas.sort((a, b)=> {return a.position - b.position});
    else
      return null;
  }

  public get sortedLanguages(){
    if (this.languages != null)
      return this.languages.sort((a, b)=> {return a.id - b.id});
    else
      return null;
  }

  openmodal(){
    (<HTMLInputElement>document.getElementById("mediainput")).value = "";
    this.modalService.open("ov_media");
  }

  closemodal(){
    var text = (<HTMLInputElement>document.getElementById("mediainput")).value;

    if (text != ""){
      var e = (<HTMLSelectElement>document.getElementById("language"));
      if (+e.options[e.selectedIndex].id != -1){
        if (this.currentstation.id != -1){
            this.http.post(environment.localurl + "posttext", {"text": text, "language_id": +e.options[e.selectedIndex].id, "station_id": this.currentstation.id}).subscribe(function(res){
              console.log(res);
            }.bind(this));
        }
        else if (this.currentstation.id == -1){
            this.tosavemedias.push({"id": -1, "caption": null, "text": text, "language_id": +e.options[e.selectedIndex].id, "station_id": -1});
            (<HTMLElement>document.getElementById("mediaoutput")).innerHTML = "";
            this.tosavemedias.forEach(e => {
              (<HTMLElement>document.getElementById("mediaoutput")).innerHTML += "<p>" + e.text + "</p>";
            });
        }

          this.modalService.close("ov_media");
      }
      else
        alert("Please select Language!");
    }
    else{
      if(confirm("No value added. Cancel?"))
        this.modalService.close("ov_media");
    }
  }

  save(){
    try{
      var e = (<HTMLSelectElement>document.getElementById("area"));
      this.currentstation = {
        id : this.currentstation.id,
        name : (<HTMLInputElement>document.getElementById("name")).value,
        area_id: +e.options[e.selectedIndex].id,
        ordernumber: this.currentstation.ordernumber
      };

      var id: number;
      console.log(this.currentstation.ordernumber);

      if(this.currentstation.name != "" && this.currentstation.name != null){
        if (this.currentstation.id == -1){
          console.log(this.currentstation.name + this.currentstation.area_id);
          this.http.post(environment.localurl + "poststation", {"name": this.currentstation.name, "area_id": this.currentstation.area_id})
          .subscribe(function(res) {
            console.log(res);
            this.currentstation = res;
            id = res.insertId;

            this.tosavemedias.forEach(e => {
              this.http.post(environment.localurl + "posttext", {"text": e.text, "language_id": e.language_id, "station_id": id}).subscribe(function(res){
                console.log(res);
              }.bind(this));
            });
          }.bind(this));

          alert("New Station created.");

          this.router.navigate(['/stations']);
        }
        else if (this.currentstation.id != -1){
          this.http.put(environment.localurl + "updatestation", this.currentstation).subscribe(function(res) {
            console.log(res);
            this.currentarea = res;
          }.bind(this));

          alert("Station updated.");
          this.router.navigate(['/stations']);
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
    if (!isNaN(this.currentstation.id) && this.currentstation.id != -1){
      const httpOpt = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "station", "id" : this.currentstation.id}
      };
      this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){
        this.currentTour = res;
      }.bind(this));
      alert("Delete successful.")
      this.router.navigate(['/stations']);
    }
    else if (this.currentstation.id == -1)
      this.router.navigate(['/stations']);
    else{
      console.log("An error occured when trying to delete.");
    }
  }

  deleteMedia(id:number){
    console.log(id);
    if(confirm("Do you want to delete?")){
      const httpOpt = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "media", "id" : id}
      };
      this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){
        console.log(res);
      }.bind(this));

      console.log("Delete Media.");
    }
  }
}

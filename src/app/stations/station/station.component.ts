import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from 'src/app/shared/media.model';
import AreaModel from 'src/app/shared/area.model';
import { ModalService } from 'src/app/_modal';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  currentstation: StationModel;
  media: MediaModel[];
  areas: AreaModel[];
  tosavemedias = [];

  constructor(private router: Router, private http: HttpClient, private modalService : ModalService) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentstation = stateData.station;
    } else {
      this.router.navigate(['']);
    }

    if (this.currentstation.id != -1){
      this.http.get<MediaModel[]>("http://localhost:3000/mediasforstation/" + this.currentstation.id).subscribe((res) => {
        this.media = res;
      });
    }

    this.http.get<AreaModel[]>("http://localhost:3000/areas").subscribe((res) => {
      this.areas = res;
    });
   }

  ngOnInit() {
  }
  
  public get sortedMedia(){
    if (this.media != null)
      return this.media.sort((a, b)=> {return a.id - b.id});
    else
      return null;
  }

  public get sortedArea(){
    if (this.areas != null)
      return this.areas.sort((a, b)=> {return a.position - b.position});
    else
      return null;
  }

  openmodal(){
    (<HTMLInputElement>document.getElementById("mediainput")).value = "";
    this.modalService.open("ov_media");
  }

  closemodal(){
    var text = (<HTMLInputElement>document.getElementById("mediainput")).value;
    console.log(text);
    if (text != ""){
      if (this.currentstation.id != -1){
        this.http.post("http://localhost:3000/posttext", {"text": text, "station_id": this.currentstation.id}).subscribe(function(res){
          console.log(res);
        }.bind(this));
      }
      else if (this.currentstation.id == -1){
        this.tosavemedias.push(text);
      }

      this.modalService.close("ov_media");
    }
    else{
      if(confirm("No value added. Cancel?"))
        this.modalService.close("ov_media");
    }
  }

  save(){
    try{
      var e = (<HTMLSelectElement>document.getElementById("area"))
      this.currentstation = {
        id : this.currentstation.id,
        name : (<HTMLInputElement>document.getElementById("name")).value,
        area_id: +e.options[e.selectedIndex].id,
        ordernumber: this.currentstation.ordernumber
      };

      var id: number;

      if (this.currentstation.id == -1){
        console.log(this.currentstation.name + this.currentstation.area_id);
        this.http.post("http://localhost:3000/poststation", [this.currentstation.name, this.currentstation.area_id])
        .subscribe(function(res) {
          console.log(res);
          this.currentstation = res;
          id = res.insertId;

          this.tosavemedias.forEach(e => {
            this.http.post("http://localhost:3000/posttext", {"text": e, "station_id": id}).subscribe(function(res){
              console.log(res);
            }.bind(this));
          });
        }.bind(this));

        

        alert("New Station created.");

        // this.router.navigate(['']);
      }
      else if (this.currentstation.id != -1){
        console.log("Tour überarbeiten");
      }
    }
    catch(err){
      console.log("an error occured: " + err);
    }
    this.http.post<StationModel>("http://localhost:3000/poststation", this.currentstation).subscribe(
      function(res){
        console.log(res);
      }
    )
  }

  delete(){
    if (!isNaN(this.currentstation.id)){
      const httpOpt = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "station", "id" : this.currentstation.id}
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

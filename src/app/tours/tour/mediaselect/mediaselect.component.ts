import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from 'src/app/shared/media.model';
import { TourservicesService } from 'src/app/shared/services/tourservices.service';
import { ModalModule, ModalService } from 'src/app/_modal';
import { deepEqual } from 'assert';
import TourModel from 'src/app/shared/tour.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-mediaselect',
  templateUrl: './mediaselect.component.html',
  styleUrls: ['./mediaselect.component.scss']
})
export class MediaselectComponent implements OnInit {
  currentTour: TourModel;
  currentStation: StationModel;
  currentMedias: MediaModel[] = null;
  allavailableMedia: MediaModel[];

  constructor(private router: Router, private http: HttpClient, private tourservice: TourservicesService) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentStation = stateData.station;
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }

    // alle verfügbaren Medien
    this.http.get<MediaModel[]>("http://localhost:3000/mediasforstationsfortour/" + this.currentStation.id + "/" + this.currentTour.id).subscribe((res) => {
      this.currentMedias = res;       

      // die bereits ausgewählten Medien
      this.http.get<MediaModel[]>("http://localhost:3000/mediasforstation/" + this.currentStation.id).subscribe((res) => {
        this.allavailableMedia = res;
      });
    });

    // this.currentMedias = tourservice.getallMediasforTour(this.currentStation.id);

    if (document.getElementById("medias").children.length > 0){
      var medias = document.getElementById("medias").children;
      for (var i = 0; i < medias.length; i++){
        if (this.allavailableMedia[i].active)
          document.getElementById(i.toString()).className = "active";
        else if (!this.allavailableMedia[i].active)
          document.getElementById(i.toString()).className = "inactive";
      }
    }
  }

  ngOnInit() { }

  public get sortedMedia(){
    if (this.allavailableMedia != null){
      this.allavailableMedia.forEach(e => {
        this.currentMedias.forEach(ee => {
          if (e.id == ee.id)
            e.active = true;
          else
            e.active = false;
        });
      });

      return this.allavailableMedia.sort((a, b)=> {return a.id - b.id});
    }
    else
      return null;
    // return this.currentMedias;
  }

  onmediaclick(id, m){
    var med:HTMLElement = (<HTMLElement>document.getElementById(id));
    if (med.className == "active"){
      med.className = "inactive";
    }
    else if (med.className == "inactive"){
      med.className = "active";
    }
    console.log(med);
    console.log(m);
  }
}


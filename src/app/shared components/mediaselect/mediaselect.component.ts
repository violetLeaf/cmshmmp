import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from 'src/app/shared/media.model';
import { TourservicesService } from 'src/app/shared/services/tourservices.service';
import { ModalModule, ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-mediaselect',
  templateUrl: './mediaselect.component.html',
  styleUrls: ['./mediaselect.component.scss']
})
export class MediaselectComponent implements OnInit {
  currentStation: StationModel;
  currentMedias: MediaModel[];
  allavailableMedia: MediaModel[];

  constructor(private router: Router, private http: HttpClient, private tourservice: TourservicesService) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentStation = stateData.station;
    } else {
      this.router.navigate(['']);
    }

    this.http.get<MediaModel[]>("http://localhost:3000/mediasforstationsfortour/" + 
        this.currentStation.id).subscribe((res) => {
        this.currentMedias = res;
    });

    // this.currentMedias = tourservice.getallMediasforTour(this.currentStation.id);
  }

  ngOnInit() {
  }

  public get sortedMedia(){
    if (this.currentMedias != null)
      return this.currentMedias.sort((a, b)=> {return a.id - b.id});
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


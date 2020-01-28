import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from 'src/app/shared/media.model';
import { TourservicesService } from 'src/app/shared/services/tourservices.service';

@Component({
  selector: 'app-mediaselect',
  templateUrl: './mediaselect.component.html',
  styleUrls: ['./mediaselect.component.scss']
})
export class MediaselectComponent implements OnInit {
  currentStation: StationModel;
  currentMedias: MediaModel[];

  constructor(private router: Router, private http: HttpClient, private tourservice: TourservicesService) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentStation = stateData.station;
    } else {
      this.router.navigate(['']);
    }

  //   this.http.get<MediaModel[]>("http://localhost:3000/mediasforstationsfortour/" + this.currentStation.id).subscribe(function(res) {
  //     this.currentMedias = res;
  //     console.log(res);
  //     console.log(this.currentMedias);
  //  }.bind(this));
  //  console.log(this.currentMedias);

    this.currentMedias = tourservice.getallMediasforTour(1);
    console.log(this.currentMedias);
  }

  ngOnInit() {
  }

  public get sortedMedia(){
    return this.currentMedias.sort((a, b)=> {return a.id - b.id});
    // return null;
  }
}

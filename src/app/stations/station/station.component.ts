import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  currentstation: StationModel;

  constructor(private router: Router, private http: HttpClient) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentstation = stateData.tour;
    } else {
      this.router.navigate(['']);
    }
   }

  ngOnInit() {
  }
  
  public get sortedMedia(){
    // return this.currentstation.media.sort((a, b)=> {return a.id - b.id});
    return null;
  }

  poststation(){
    this.http.post<StationModel>("http://localhost:3000/poststation", this.currentstation).subscribe(
      function(res){
        console.log(res);
      }
    )
  }
}

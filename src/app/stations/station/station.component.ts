import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  currenttour: any;

  constructor(private router: Router) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currenttour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }
   }

  ngOnInit() {
  }
  
  public get sortedMedia(){
    return this.currenttour.media.sort((a, b)=> {return a.id - b.id});
  }
}

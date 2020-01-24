import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  currentTemplate: any;
  zwtableinfos: any;
  temps: any;

  constructor(private router: Router, private http: HttpClient) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentTemplate = stateData.tour;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  onStationClick(tour: any) {
    this.router.navigate(['stations/station'], {state: {data: {tour}}});
    console.log(tour);
  }

  public get sortedStations(){
    // return this.currentTemplate.stations.sort((a, b)=> {return a.id - b.id});
    return null;
  }

}

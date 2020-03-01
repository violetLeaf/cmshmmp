import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import StationModel from 'src/app/shared/station.model';
import MediaModel from 'src/app/shared/media.model';
import LanguageModel from 'src/app/shared/language.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  currentTemplate: any;
  currentStations: StationModel[];
  allStations: StationModel[] = null;
  
  currentMedias: MediaModel[] = null;
  allavailableMedia: MediaModel[];

  languages: LanguageModel[];

  constructor(private router: Router, private http: HttpClient) { 
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined)
      this.currentTemplate = stateData.template;
    else
      this.router.navigate(['']);

    this.http.get<StationModel[]>("http://localhost:3000/stationsfortemplate/" + 
      this.currentTemplate.id).subscribe((res) => {
      this.currentStations = res;

      this.http.get<StationModel[]>("http://localhost:3000/stations").subscribe((res) => {
        this.allStations = res;

        this.allStations.forEach(station => {
          station.selected = this.currentStations.includes(station);
        });

        console.log(this.currentStations);
        console.log(this.allStations);
      });
    });

    this.http.get<LanguageModel[]>("http://localhost:3000/languages").subscribe((res) => {
      this.languages = res;
    });
  }

  ngOnInit() {
  }


}

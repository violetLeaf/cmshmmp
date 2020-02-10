import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import AreaModel from '../shared/area.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  areas: AreaModel[];
  standardArea: AreaModel = {
    id: -1,
    title: "",
    position: -1
  }

  constructor(private router: Router, private http: HttpClient) { 
    
    this.http.get<AreaModel[]>("http://localhost:3000/areas").subscribe((res) => {
        this.areas = res;
        console.log(this.areas);
    });
}

  ngOnInit() { }

  
  onAreaClick(area: any) {
    this.router.navigate(['areas/area'], {state: {data: {area}}});
  }

  public get sortedAreas(){
    if (this.areas != null)
      return this.areas.sort((a, b)=> {return a.position - b.position});
    else
      return null;
  }
}

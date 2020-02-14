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
  standardArea: AreaModel;

  constructor(private router: Router, private http: HttpClient) { 
    
    this.http.get<AreaModel[]>("http://localhost:3000/areas").subscribe((res) => {
        this.areas = res;
        console.log(this.areas);

        this.standardArea = {
          id: -1,
          title: "",
          position: (this.areas.length + 1)
        };
    });
}

  ngOnInit() { }

  
  onAreaClick(area: any) {
    this.router.navigate(['areas/area'], {state: {data: {area}}});
  }

  move(direction:string, pos:number){
    if (direction == "up"){
      console.log("move up: " + pos);
    }
    else if (direction == "down"){
      console.log("move down: " + pos);
    }
  }

  public get sortedAreas(){
    if (this.areas != null)
      return this.areas.sort((a, b)=> {return a.position - b.position});
    else
      return null;
  }
}

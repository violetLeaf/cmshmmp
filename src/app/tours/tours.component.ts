import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {

  // Anpassen auf Datenbank
  tourarray = [
    {id: 1, name: "Test Tour 1", date: new Date(2019, 6, 11, 10), guide: "Max Mustermann"},
    {id: 2, name: "Test Tour 2", date: new Date(2019, 6, 11, 8), guide: "Max Mustermann"},
    {id: 4, name: "Test Tour 4", date: new Date(2019, 6, 12, 12), guide: "Max Mustermann"},
    {id: 3, name: "Test Tour 3", date: new Date(2019, 6, 12, 16), guide: "Max Mustermann"},
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    // console.log(this.tourarray);
  }

  onTourClick(tour: any) {
    this.router.navigate(['tours/tour'], {state: {data: {tour}}});
  }

  public get sortedTours(){
    return this.tourarray.sort((a, b)=> {return a.id - b.id});
  }
}

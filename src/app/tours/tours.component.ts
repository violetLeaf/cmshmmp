import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import TourModel from '../shared/tour.model';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {

  // Anpassen auf Datenbank // momentan Testdaten
  tourarray = [
    {id: 1, name: "Test Tour 1", date: new Date(2019, 6, 11, 10), guide: "Max Mustermann", stations: [
      {id: 1, name: "Station XY", media: [
          {id: 1, type: "text", name: "Text 1"},
          {id: 2, type: "picture", name: "picture 1"},
          {id: 3, type: "video", name: "video 1"}]},
      {id: 2, name: "Station YX", media: [
        {id: 1, type: "text", name: "Text 2"},
        {id: 2, type: "picture", name: "picture 2"},
        {id: 3, type: "video", name: "video 2"}]}]},
    {id: 2, name: "Test Tour 2", date: new Date(2019, 6, 11, 8), guide: "Max Mustermann", stations: [
      {id: 3, name: "Station ZZ", media: [
        {id: 1, type: "text", name: "Text 3"},
        {id: 2, type: "picture", name: "picture 3"},
        {id: 3, type: "video", name: "video 3"}]},
      {id: 4, name: "Maschine A", media: [
        {id: 1, type: "text", name: "Text 4"},
        {id: 2, type: "picture", name: "picture 4"},
        {id: 3, type: "video", name: "video 4"}]}]},
    {id: 4, name: "Test Tour 4", date: new Date(2019, 6, 12, 12), guide: "Max Mustermann", stations: [
      {id: 5, name: "Maschine B", media: [
        {id: 1, type: "text", name: "Text 5"},
        {id: 2, type: "picture", name: "picture 5"},
        {id: 3, type: "video", name: "video 5"}]},
      {id: 6, name: "Information Table", media: [
        {id: 1, type: "text", name: "Text 6"},
        {id: 2, type: "picture", name: "picture 6"},
        {id: 3, type: "video", name: "video 6"}]}]},
    {id: 3, name: "Test Tour 3", date: new Date(2019, 6, 12, 16), guide: "Max Mustermann", stations: [
      {id: 7, name: "Video Panel", media: [
        {id: 1, type: "text", name: "Text 7"},
        {id: 2, type: "picture", name: "picture 7"},
        {id: 3, type: "video", name: "video 7"}]},
      {id: 8, name: "something", media: [
        {id: 1, type: "text", name: "Text 8"},
        {id: 2, type: "picture", name: "picture 8"},
        {id: 3, type: "video", name: "video 8"}]}]},
  ];

  toursarray: TourModel[] = [];

  constructor(private router: Router, private http: HttpClient) {
    // this.toursarray = this.http.get("http://localhost:3000/tours");

    this.http.get<TourModel[]>("http://localhost:3000/tours").subscribe(function(res) {
       this.toursarray=res;
      //  console.log(this.toursarray);
    }.bind(this));
  }

  ngOnInit() {
    
  }

  onTourClick(tour: any) {
    this.router.navigate(['tours/tour'], {state: {data: {tour}}});
  }

  public get sortedTours(){
    return this.toursarray.sort((a, b)=> {return a.id - b.id});
  }

  // this.http.post<TourModel>("http://localhost:3000/posttour", this.toursarray[0]).subscribe(
  //     function(res){
  //       console.log(res);
  //     }
    // )
}

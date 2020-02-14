import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import AreaModel from 'src/app/shared/area.model';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  currentarea: AreaModel;

  constructor(private router: Router, private http: HttpClient) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentarea = stateData.area;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  save(){
    try{
      this.currentarea = {
        id : this.currentarea.id,
        title : (<HTMLInputElement>document.getElementById("title")).value,
        // position: +(<HTMLInputElement>document.getElementById("position")).value
        position: this.currentarea.position
      };

      var id: number;

      if(this.currentarea.position != null && this.currentarea.title != null && this.currentarea.title != ""){
        if (this.currentarea.id == -1){
          console.log(this.currentarea.title + this.currentarea.position);
          this.http.post("http://localhost:3000/postarea", {"title": this.currentarea.title, "position": this.currentarea.position})
          .subscribe(function(res) {
            console.log(res);
            this.currentarea = res;
          }.bind(this));

          alert("New Area created.");

          this.router.navigate(['/areas']);
        }
        else if (this.currentarea.id != -1){
          console.log("Area überarbeiten");
        }
      }
      else
        alert("Eingaben überprüfen!");
    }
    catch(err){
      console.log("an error occured: " + err);
    }
  }

  delete(){
    if (!isNaN(this.currentarea.id) && this.currentarea.id != -1){
      const httpOpt = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "area", "id" : this.currentarea.id}
      };
      this.http.delete("http://localhost:3000/delete", httpOpt).subscribe(function(res){
        this.currentarea = res;
      }.bind(this));
      this.router.navigate(['/areas']);
    }
    else if (this.currentarea.id == -1)
      this.router.navigate(['/areas']);
    else{
      console.log("An error occured when trying to delete.");
    }
  }
}

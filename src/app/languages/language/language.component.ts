import { Component, OnInit } from '@angular/core';
import LanguageModel from 'src/app/shared/language.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  currentlanguage: LanguageModel;

  constructor(private router: Router, private http: HttpClient) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      this.currentlanguage = stateData.language;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  save(){
    try{
      this.currentlanguage = {
        id : this.currentlanguage.id,
        name : (<HTMLInputElement>document.getElementById("name")).value
      };

      var id: number;

      if( this.currentlanguage.name != "" && this.currentlanguage.name != null){
        if (this.currentlanguage.id == -1){
          console.log(this.currentlanguage.name);
          this.http.post(environment.localurl + "postlanguage", {"name": this.currentlanguage.name})
          .subscribe(function(res) {
            console.log(res);
            this.currentlanguage = res;
          }.bind(this));

          alert("New Language created.");
          this.router.navigate(['/languages']);
        }
        else if (this.currentlanguage.id != -1){
          this.http.put(environment.localurl + "updatelanguage", this.currentlanguage).subscribe(function(res) {
            this.currentlanguage = res;
          }.bind(this));
          
          alert("Language updated.");
          this.router.navigate(['/languages']);
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
    if (confirm("Are you sure you want to delete?")){
      if (!isNaN(this.currentlanguage.id) && this.currentlanguage.id != -1){
        const httpOpt = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"table" : "language", "id" : this.currentlanguage.id}
        };
        this.http.delete(environment.localurl + "delete", httpOpt).subscribe(function(res){
          this.currentarea = res;
        }.bind(this));
        alert("Delete successful.");
        this.router.navigate(['/languages']);
      }
      else if (this.currentlanguage.id == -1)
        this.router.navigate(['/languages']);
      else{
        console.log("An error occured when trying to delete.");
      }
    }
  }
}

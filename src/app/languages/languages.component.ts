import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import LanguageModel from '../shared/language.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  languages:LanguageModel[];
  standardLanguage:LanguageModel = {
    id: -1,
    name: ""
  }

  constructor(private router: Router, private http: HttpClient) { 
    
    this.http.get<[]>(environment.localurl + "languages").subscribe((res) => {
        this.languages = res;
        console.log(this.languages);
    });
}

  ngOnInit() { }

  
  onlanguageClick(language: any) {
    this.router.navigate(['languages/language'], {state: {data: {language}}});
  }

  public get sortedLanguages(){
    if (this.languages != null)
      return this.languages.sort((a, b)=> {return a.id - b.id});
    else
      return null;
  }
}

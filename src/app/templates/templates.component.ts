import { Component, OnInit } from '@angular/core';
import TemplateModel from '../shared/template.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  templatesarray: TemplateModel[] = [];
  standardTemplate: TemplateModel= {
    id: -1,
    title: "Standard Template"
  };

  constructor(private router: Router, private http: HttpClient) {
    this.http.get<TemplateModel[]>(environment.localurl + "templates").subscribe(function(res) {
       this.templatesarray = res;
    }.bind(this));
  }

  ngOnInit() {
  }

  onTemplateClick(template: any) {
    this.router.navigate(['templates/template'], {state: {data: {template}}});
  }

  public get sortedTemplates(){
    return this.templatesarray.sort((a, b)=> {return a.id - b.id});
  }
}

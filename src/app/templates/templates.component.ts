import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  exampleTemplates = [
    {id: 1, name: "Schüler"},
    {id: 2, name: "Lieferant"},
    {id: 3, name: "Konkurrent"}
  ]

  constructor() { }

  ngOnInit() {
  }

  public get sortedTemplates(){
    return this.exampleTemplates.sort((a, b)=> {return a.id - b.id});
  }
}

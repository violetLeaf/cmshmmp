import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mediaspace',
  templateUrl: './mediaspace.component.html',
  styleUrls: ['./mediaspace.component.scss']
})
export class MediaspaceComponent implements OnInit {

  constructor(private modalService: ModalService, private http: HttpClient) { }

  ngOnInit() {
  }

  openmodal(){
    this.modalService.open("ov_mediaspace");
  }

  closemodal(){
    this.modalService.close("ov_mediaspace");
  }
}

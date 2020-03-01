import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { HttpClient } from '@angular/common/http';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-mediaspace',
  templateUrl: './mediaspace.component.html',
  styleUrls: ['./mediaspace.component.scss']
})


export class MediaspaceComponent implements OnInit {
  // TUTORIAL FOR IMAGE SELECTOR
  // TODO: USE this.selectedFile.file TO SAVE IMAGE IN DIRECTORY
  // IMAGE SHOULD BE SAVED IN \src\assets\mediaspaceImages
  // https://www.freecodecamp.org/news/how-to-make-image-upload-easy-with-angular-1ed14cb2773b/
  selectedFile: ImageSnippet;
  constructor(private modalService: ModalService, private http: HttpClient) {  }

  private onSuccess() {
      this.selectedFile.pending = false;
      this.selectedFile.status = 'ok';
    }

    private onError() {
      this.selectedFile.pending = false;
      this.selectedFile.status = 'fail';
      this.selectedFile.src = '';
    }

    processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
      //     this.onSuccess();
      //   },
      //   (err) => {
      //     this.onError();
      //   })
    });

    reader.readAsDataURL(file);
  }

  ngOnInit() {
  }

  showImages(){
    // TESTFUNCTION TO SHOW IMAGES

    //picturePaths SHOULD BE A GLOBAL VARIABLE AND GETS THE NAMES OF THE IMAGE FILES FROM THE API (AS THE API ISNT WORKING WE CANT MOVE ON TESTING)
    //THE VARIABLE SHOULD BE GLOBAL AS OTHER FUNCTIONS NEED THE VALUES AS WELL
    var picturePaths = ["img2.png", "img1.png"];


    //TODO: GET ALL IMAGES WITH .http REQUEST

    //GO THROUGH ALL IMAGES AND DISPLAY THEM IN THE ImageContainer
    //TODO: CSS
    picturePaths.forEach(e => {
      var hallo = '<img src="../../../assets/mediaspaceImages/' + e + '"/>';
      (<HTMLElement>document.getElementById("ImageContainer")).innerHTML += '<img src="../../../assets/mediaspaceImages/' + e + '"/>';
    });
  }


  // NOT NEEDED!
  openmodal(){
    this.modalService.open("ov_mediaspace");
  }
  // NOT NEEDED!
  closemodal(){
    this.modalService.close("ov_mediaspace");
  }
}

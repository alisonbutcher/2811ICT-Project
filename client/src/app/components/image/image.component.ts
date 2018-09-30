import { Component, OnInit } from '@angular/core';
// import { ImgUploadService } from '../../services/image'

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    title = 'app';
    selectedFile = null;
    imagepath = "";

    constructor() { }

    ngOnInit() {
    }

    // onFileSelected(event) {
    //   console.log(event);
    //   this.selectedFile = event.target.files[0];
    // }

    // onUpload() {
    //   const fd = new FormData();
    //   fd.append('image', this.selectedFile, this.selectedFile.name);
    //   this.imageUploadService.imgupload(fd).subscribe(res => {
    //     this.imagepath = res.data.filename;
    //     console.log(res.data.filename + ', ' + res.data.size);
    //   });
    // }

}

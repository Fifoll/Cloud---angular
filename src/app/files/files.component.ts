import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file'

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent {

  files: File[] = [];
  
  constructor(private fileService: FileService){
    this.getFiles();
  }

  getFiles() {
    this.fileService.getAllFiles().subscribe({
      next: (data: any) => {
        if(data.success === true) {
          const files:File[] = data.data;
          this.files = files;
        }
      },
      error: (err) => console.log(err)
    })
  }



}

import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file'

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  files: File[] = [];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getExtension(path: string): string {
    if (path) {
      const segments = path.split('.');
      if (segments.length < 2) {
        throw new Error('Invalid path format');
      }
      const extension = segments[segments.length - 1];

      return extension;
    } 
    else {
      throw new Error('Empty path provided');
    }
  }

  getFiles() {
    this.fileService.getAllFiles().subscribe({
      next: (data: any) => {
        if (data.success === true) {
          const files: File[] = data.data;
          this.files = files;
        }
      },
      error: (err) => console.log(err)
    })
  }



}

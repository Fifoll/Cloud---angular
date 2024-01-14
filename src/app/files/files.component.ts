import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file'
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  files: File[] = [];

  constructor(private fileService: FileService, public dialog: MatDialog) { }

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

  async deleteFile(id: number): Promise<void> {
    const confirmed: boolean = await this.openConfirmDialog();

    if(confirmed) {
      this.fileService.deleteFileById(id).subscribe({
        next: (data: any) => {
          this.getFiles();
        },
        error: err => console.log(err)
      })
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
      error: err => console.log(err)
    })
  }

  openConfirmDialog(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          heading: 'Confirm deleting file',
          body: 'Are you sure you want to delete this file? This action cannot be undone. Confirm deletion?',
          button: ['confirm', 'close']
        },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === "true") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }



}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dialog-data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer: DomSanitizer
  ) {}

  close(status?: boolean): void {
    if(status) {
      this.dialogRef.close('true');
    } 
    else {
      this.dialogRef.close();
    }
  }

  getHTML(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dialog-data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  fileName: string | undefined = this.getFileNameWithoutExtension(this.data.editName);
  editForm = new FormGroup({
    name: new FormControl(this.fileName, [ Validators.required ]),
  });

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

  sendData() {
    if (this.editForm.valid) {
      const newName = this.editForm.getRawValue().name;
      this.dialogRef.close(newName);
    }
  }

  getFileNameWithoutExtension(filename: string | undefined): string | undefined {
    if(filename) {
      const parts = filename.split('.');
      parts.pop();
      const nameWithoutExtension = parts.join('.');
      return nameWithoutExtension;
    }
    return;
  }
}

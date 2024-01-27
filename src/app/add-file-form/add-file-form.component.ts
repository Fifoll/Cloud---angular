import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../file.service';

@Component({
  selector: 'app-add-file-form',
  templateUrl: './add-file-form.component.html',
  styleUrls: ['./add-file-form.component.css']
})
export class AddFileFormComponent {

  @Output() submitEvent = new EventEmitter<boolean>();

  fileStore: FileList | undefined | null;

  addForm = new FormGroup({
    file: new FormControl('', [Validators.required,]),
    name: new FormControl('')
  });

  nameAlreadyExists: boolean = false;

  constructor(private fileService: FileService){}

  filesOnChange(list: FileList | null): void {
    this.fileStore = list;
    this.nameAlreadyExists = false;
    if (list && list.length) {
      const file = list[0];
      this.addForm.get('file')?.setValue(file.name);
      this.addForm.get('name')?.setValue(this.removeExtension(file.name));
    }
  }

  addNewFile() {
    const formData: FormData = new FormData();
    const name = this.addForm.getRawValue().name;
    if(this.fileStore) formData.append("file", this.fileStore[0]);
    if(name) formData.append("fileName", name);
    this.fileService.addFile(formData).subscribe({
      next: (data: any) => {
        this.submitEvent.emit(true);
      },
      error: (err) => {
        if(err.status === 409) {
          this.nameAlreadyExists = true;
        }
        else {
          
        }
      }
    })
  }

  removeExtension(text: string): string {
    const lastDotIndex = text.lastIndexOf('.');

    if (lastDotIndex !== -1) {
      return text.substring(0, lastDotIndex);
    } else {
      return text;
    }
  }

}

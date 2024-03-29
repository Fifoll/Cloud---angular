import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AddFileFormComponent } from '../add-file-form/add-file-form.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {

  @Output() refreshData = new EventEmitter();

  searchinput: string | null = null;
  sortInput: object | null = {};

  constructor(public dialog: MatDialog) { }

  openAddDialog(): Promise<string | null> {
    return new Promise<string | null>(resolve => {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          heading: 'Add new file',
          button: ['close'],
          addFile: true
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        this.refreshData.emit();
        resolve(result || null);
      });
    });
  }

  toolsFilterFiles(query: string | null) {
    this.searchinput = query;
    this.modifyFiles();
  }

  toolsSortFiles(options: object | null) {
    this.sortInput = options;
    this.modifyFiles();
  }

  modifyFiles() {
    this.refreshData.emit({
      search: this.searchinput,
      sort: this.sortInput
    });
  }

}

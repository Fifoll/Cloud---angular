import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  selectedValue: string = '';
  order: boolean = true;

  @Output() sortFilesEvent = new EventEmitter<object | null>();

  sortForm = new FormGroup({
    sort: new FormControl()
  });

  sortFiles(event: MatSelectChange) {
    this.selectedValue = event.value;
    this.emitEvent();
  }

  changeOrder() {
    this.order = !this.order;
    this.emitEvent();
  }

  emitEvent() {
    const options = {
      field: this.selectedValue,
      order: this.order
    };
    this.sortFilesEvent.emit(options);
    console.log(options);
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  selectedValue: boolean = false;
  order: boolean = true;

  sortForm = new FormGroup({
    sort: new FormControl()
  });

  sortFiles(event: MatSelectChange) {
    this.selectedValue = true;
    console.log("Wybrane wartość:", event.value);
  }
  changeOrder() {
    this.order = !this.order;
  }
}

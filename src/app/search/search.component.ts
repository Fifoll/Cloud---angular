import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../file.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() searchFilter = new EventEmitter<string | null>();
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  constructor(private fileServive: FileService){}

  search() {
    const query = this.searchForm.getRawValue().query;
    this.searchFilter.emit(query);
  }
}

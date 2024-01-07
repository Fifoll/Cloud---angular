import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() closeSearchModalEmitter = new EventEmitter<string>();

  closeSearchModal() {
    this.closeSearchModalEmitter.emit();
  }
}

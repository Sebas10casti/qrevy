import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {

  form = {
    country: "",
    category: "Show All",
  };

  @Output() filter = new EventEmitter();

  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.filter.emit(this.form);
  }
}

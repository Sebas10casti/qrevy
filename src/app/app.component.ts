import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  title = 'qrevy';
  filterCountry: any = '';


  handleFilter(filter:any){
    this.filterCountry = filter;
  }

  constructor() {
  }
}

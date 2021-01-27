import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryListComponent } from './components/country-list/country-list.component';
import { HttpClientModule} from '@angular/common/http';
import { FilterCountryPipe } from './pipes/filter-country.pipe';
import { FormsModule } from '@angular/forms';
import { DetailCountryComponent } from './components/detail-country/detail-country.component';
import { BaseModalDirective } from './directives/base-modal.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountryListComponent,
    FilterCountryPipe,
    DetailCountryComponent,
    BaseModalDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

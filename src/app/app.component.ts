import { Component } from '@angular/core';
import {CovidApiService} from './covid-api.service';
import {CountryModel} from './models/country.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'covid19-col';
  widthCol = '300px';
  heightCol = '100%';
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  deathsReorder: boolean;
  curedReorder: boolean;
  suspectedReorder: boolean;
  casesReorder: boolean;
  constructor( private covidApiService: CovidApiService) {
    this.getCountryByName('colombia');
    this.getCountryList();
    console.log(`Country : ${JSON.stringify(this.actualCountry)}`);
  }
  getCountryList() {
    this.covidApiService.getCountryList().subscribe(res => {
      console.log(`getCountryList : ${JSON.stringify(res)}`)
      // order list
      res.sort( (countryA, countryB) =>  countryB.cases - countryA.cases)
      this.casesReorder = true;
      this.latinCountries = res;
    });
  }

  getCountryByName(countryName: string ) {
    if (countryName) {
        this.covidApiService.getCountry(countryName).subscribe(res => {
          console.log(`method getCountryByName :  ${JSON.stringify(res)}`)
          this.actualCountry = res;
        });
    }
  }

  reorderByDeaths() {
    if (this.latinCountries && !this.deathsReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.deaths - countryA.deaths);
      this.deathsReorder = true;
    } else if (this.latinCountries && this.deathsReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.deaths - countryB.deaths);
      this.deathsReorder = false;
    }
  }

  reorderByCured() {
    if (this.latinCountries && !this.curedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.cured - countryA.cured);
      this.curedReorder = true;
    } else if (this.latinCountries && this.curedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.cured - countryB.cured);
      this.curedReorder = false;
    }
  }

  reorderBySuspected() {
    if (this.latinCountries && !this.suspectedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.suspects - countryA.suspects);
      this.suspectedReorder = true;
    } else if (this.latinCountries && this.curedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.suspects - countryB.suspects);
      this.suspectedReorder = false;
    }
  }

  reorderByCases() {
    console.log('click cases order ')
    if (this.latinCountries && !this.casesReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
    } else if (this.latinCountries && this.casesReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.cases - countryB.cases);
      this.casesReorder = false;
    }
  }

  private upperFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1, text.length);
  }
}

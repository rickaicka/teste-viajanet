import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public idaVolta = false;
  public originAirports: Array<any> = [];
  public destinyAirports: Array<any> = [];
  public adultsList: Array<string> = ['1 Adulto', '2 Adultos', '3 Adultos'];
  public childrenList: Array<string> = ['Nenhuma', '1 Criança', '2 Crianças'];
  public babiesList: Array<string> = ['Nenhum', '1 Bebê', '2 Bebês'];
  public adultDefault = '2 Adultos';
  public childDefault = 'Nenhuma';
  public babyDefault = 'Nenhum';


  public searchForm = new FormGroup({
    origin: new FormControl(''),
    destiny: new FormControl(''),
    departureDate: new FormControl(''),
    returnDate: new FormControl(''),
    qttAdult: new FormControl('2 Adultos'),
    qttChild: new FormControl('Nenhuma'),
    qttBaby: new FormControl('Nenhum'),
  });

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  setAirportOrigin(airport: string) {
    this.searchForm.controls.origin.setValue(airport);
    this.originAirports = [];
  }

  setAirportDestiny(airport: string) {
    this.searchForm.controls.destiny.setValue(airport);
    this.destinyAirports = [];
  }

  setAdult(item: string) {
    this.searchForm.controls.qttAdult.setValue(item);
    this.adultDefault = item;
  }
  setChild(item: string) {
    this.searchForm.controls.qttChild.setValue(item);
    this.childDefault = item;
  }
  setBaby(item: string) {
    this.searchForm.controls.qttBaby.setValue(item);
    this.babyDefault = item;
  }

  getAirportsOrigin(event: any) {
    if (this.searchForm.controls.origin.value.length >= 3) {
      this.searchService.getAirpotsByAutocomplete(this.searchForm.controls.origin.value).subscribe(
        (data) => {
          this.originAirports = data.Locations;
        }
      );
    } else {
      this.originAirports = [];
    }
  }

  getAirportsDestiny() {
    if (this.searchForm.controls.destiny.value.length >= 3) {
      this.searchService.getAirpotsByAutocomplete(this.searchForm.controls.destiny.value).subscribe(
        (data) => {
          this.destinyAirports = data.Locations;
        }
      );
    } else {
      this.destinyAirports = [];
    }
  }

  chooseDestiny() {
    if (!this.idaVolta) {
      this.idaVolta = true;
    } else {
      this.idaVolta = false;
    }
  }

  submitForm() {
    console.log(this.searchForm.value);
  }

}

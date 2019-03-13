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


  public searchForm = new FormGroup({
    origin: new FormControl(''),
    destiny: new FormControl(''),
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
    this.searchForm.controls.origin.setValue(airport);
    this.destinyAirports = [];
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

}

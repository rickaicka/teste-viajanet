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
  public originAirports: [];
  public destinyAirports: [];


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

  getAirportsOrigin() {
    this.searchForm.controls['origin'].valueChanges.subscribe(
      (selectedValue) => {
        if (selectedValue.length >= 3) {
          this.searchService.getAirpotsByAutocomplete(selectedValue).subscribe(
            (data) => {
              this.originAirports = data.Locations;
            }
          );
        } else {
          this.originAirports = [];
        }
      }
    );
  }

  getAirportsDestiny() {
    this.searchForm.controls['destiny'].valueChanges.subscribe(
      (selectedValue) => {
        if (selectedValue.length >= 3) {
          this.searchService.getAirpotsByAutocomplete(selectedValue).subscribe(
            (data) => {
              this.destinyAirports = data.Locations;
            }
          );
        } else {
          this.destinyAirports = [];
        }
      }
    );
  }

  chooseDestiny() {
    if (!this.idaVolta) {
      this.idaVolta = true;
    } else {
      this.idaVolta = false;
    }
  }

}

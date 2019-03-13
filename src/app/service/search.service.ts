import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  public getAirpotsByAutocomplete(textAutocomplete: string) {
    return this.http.get(`https://site-capa.homolog.viajanet.com.br/resources/api/Autocomplete/` + `${textAutocomplete}`)
      .pipe(
        catchError((error) => {
            return of(error);
        })
    );
  }
}

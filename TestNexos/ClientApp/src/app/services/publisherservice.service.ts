import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Publisher } from '../models/Publisher';



@Injectable()
export class PublisherService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  get() {
    return this._http.get<Publisher>(this.myAppUrl + 'api/Publishers/Index').pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.error(error);
        return of(result as T);
      })
    );
  }

  getById(id: number) {
    //console.log(id);
    return this._http.get(this.myAppUrl + "api/Publishers/FindById/" + id).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

  save(publisher) {
    return this._http.post(this.myAppUrl + 'api/Publishers/Create', publisher).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

  update(id: number, publisher) {
    return this._http.put<Publisher>(this.myAppUrl + 'api/Publishers/Edit/' + id, publisher).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );;
  }

  delete(id): Observable<Publisher> {
    return this._http.delete(this.myAppUrl + "api/Publishers/Delete/" + id).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );;
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

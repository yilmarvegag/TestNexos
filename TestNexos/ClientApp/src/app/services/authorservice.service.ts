import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Author } from '../models/Author';



@Injectable()
export class AuthorService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  get() {
    return this._http.get<Author[]>(this.myAppUrl + 'api/Authors/Index').pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.error(error);
        return of(result as T);
      })
    );
  }

  getById(id: number) {
    //console.log(id);
    return this._http.get(this.myAppUrl + "api/Authors/FindById/" + id).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

  save(publisher) {
    return this._http.post(this.myAppUrl + 'api/Authors/Create', publisher).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

  update(id: number, author) {
    return this._http.put<Author>(this.myAppUrl + 'api/Authors/Edit/' + id, author).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );;
  }

  delete(id): Observable<Author> {
    return this._http.delete(this.myAppUrl + "api/Authors/Delete/" + id).pipe(
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

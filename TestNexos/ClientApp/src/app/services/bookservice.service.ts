import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Book } from '../models/Book';


@Injectable()
export class BookService {
  myAppUrl: string = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  get() {
    return this._http.get<Book>(this.myAppUrl + 'api/Book/Index').pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.error(error);
        return of(result as T);
      })
    );
  }

  getBookById(id: number) {
    //console.log(id);
    return this._http.get(this.myAppUrl + "api/Book/FindById/" + id).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

  saveBook(book) {
    return this._http.post(this.myAppUrl + 'api/Book/Create', book).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

  updateBook(id: number, book) {
    return this._http.put<Book>(this.myAppUrl + 'api/Book/Edit/' + id, JSON.stringify(book), this.httpOptions).pipe(
      map((res: any) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );;
  }

  deleteBook(id) {
    return this._http.delete(this.myAppUrl + "api/Book/Delete/" + id).pipe(
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
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { Book } from '../models/Book';


@Injectable()
export class BookService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  get() {
    return this._http.get<Book[]>(this.myAppUrl + 'api/Book/Index').pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getBookById(id: number) {
    return this._http.get(this.myAppUrl + "api/Book/FindById/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  saveBook(book) {
    return this._http.post(this.myAppUrl + 'api/Book/Create', book).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateBook(id: number, book) {
    return this._http.put<Book>(this.myAppUrl + 'api/Book/Edit/' + id, book).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
  }

  deleteBook(id) {
    return this._http.delete(this.myAppUrl + "api/Book/Delete/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = `${error.error}`;
    }
    console.log(errorMessage);
    console.log(error);
    return throwError(errorMessage);
  }
}

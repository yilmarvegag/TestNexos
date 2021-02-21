import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/bookservice.service'
import { Book } from '../../models/Book';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './fetchbook.component.html'
})

export class FetchBookComponent {
  
  bookPosts$: Observable<Book[]>;

  constructor(public http: HttpClient, private _router: Router, private _bookService: BookService, @Inject('BASE_URL') baseUrl: string) {
    //this.getBooks();
  }

  ngOnInit() {
    this.loadBookPosts();
  }

  loadBookPosts() {
    this.bookPosts$ = this._bookService.get();
  }

  delete(bookID) {
    var answer = confirm("Do you want to delete book with Id: " + bookID);
    console.log(answer)
    if (answer) {
      this._bookService.deleteBook(bookID).subscribe((data) => {
        this.loadBookPosts();
      }, error => console.error(error))
    }
  }
}


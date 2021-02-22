import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/bookservice.service'
import { Book } from '../../models/Book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  search(event: Event) {
    const keyWord = (event.target as HTMLInputElement).value;
    if (keyWord.length === 0) {
      this.loadBookPosts()
    } else {
      this.bookPosts$ = this._bookService.get().pipe(
        map(items => items.filter(item => item.author.fullName === keyWord || item.year === keyWord || item.title === keyWord))
      );
    }    
  }

  loadBookPosts() {
    this.bookPosts$ = this._bookService.get();
  }

  delete(bookID) {
    var answer = confirm("Do you want to delete book with Id: " + bookID);
    if (answer) {
      this._bookService.deleteBook(bookID).subscribe((data) => {
        this.loadBookPosts();
      }, error => console.error(error))
    }
  }
}


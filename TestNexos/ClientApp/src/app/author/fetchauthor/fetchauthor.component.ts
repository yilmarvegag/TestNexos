import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorService } from '../../services/authorservice.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Author } from '../../models/Author';

@Component({
  selector: 'app-fetch-author',
  templateUrl: './fetchauthor.component.html'
})
export class FetchAuthorComponent {
  //public authors: Author[];
  authorPosts$: Observable<Author[]>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _authorService: AuthorService, private _router: Router) {
    //http.get<Author[]>(baseUrl + 'api/Authors/Index').subscribe(result => {
    //  this.authors = result;
    //}, error => console.error(error));
  }

  ngOnInit() {
    this.loadAuthorPosts();
  }

  loadAuthorPosts() {
    this.authorPosts$ = this._authorService.get();
  }

  delete(authorID) {
    var ans = confirm("Do you want to delete Author with Id: " + authorID);
    if (ans) {
      this._authorService.delete(authorID).subscribe((data) => {
        this.loadAuthorPosts();
      }, error => console.error(error))
    }
  }
}

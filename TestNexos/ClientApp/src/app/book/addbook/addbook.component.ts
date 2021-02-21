import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FetchBookComponent } from '../fetchbook/fetchbook.component';
import { BookService } from '../../services/bookservice.service';
import { AuthorService } from '../../services/authorservice.service';
import { PublisherService } from '../../services/publisherservice.service';

@Component({
  templateUrl: './addbook.component.html'
})

export class createbook implements OnInit {
  bookForm: FormGroup;
  titlePage: string = "Create";
  bookId: number;
  errorMessage: any;
  message: string;
  authorList: Array<any> = [];
  publisherList: Array<any> = [];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _bookService: BookService, private _authorService: AuthorService, private _publisherService: PublisherService, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.bookId = this._avRoute.snapshot.params["id"];
    }

    this.bookForm = this._fb.group({
      id: 0,
      year: ['', [Validators.required]],
      title: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      numberOfPages: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      authorId: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this._authorService.get().subscribe((data) => {
      this.authorList = data;
    }, error => this.errorMessage = error);

    this._publisherService.get().subscribe((data) => {
      this.publisherList = data;
    }, error => this.errorMessage = error);

    if (this.bookId > 0) {
      this.titlePage = "Edit";
      this._bookService.getBookById(this.bookId).subscribe(resp => this.bookForm.patchValue(resp), error => this.errorMessage = error);
    }
  }

  save() {


    if (!this.bookForm.valid) {
      return;
    }

    if (this.titlePage == "Create") {
      this._bookService.saveBook(this.bookForm.value)
        .subscribe((data) => {
          this.message = data.message;
          this._router.navigate(['/register-book']);
        }, error => this.errorMessage = error)
    }
    else if (this.titlePage == "Edit") {
      this._bookService.updateBook(this.bookId, this.bookForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-book']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/fetch-book']);
  }

  get title() { return this.bookForm.get('title'); }
  get year() { return this.bookForm.get('year'); }
  get gender() { return this.bookForm.get('gender'); }
  get numberOfPages() { return this.bookForm.get('numberOfPages'); }
  get publisherId() { return this.bookForm.get('publisherId'); }
  get authorId() { return this.bookForm.get('authorId'); }
}

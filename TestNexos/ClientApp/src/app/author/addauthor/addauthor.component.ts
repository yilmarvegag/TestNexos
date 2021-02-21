import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../services/authorservice.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './addauthor.component.html'
})

export class createauthor implements OnInit {
  authorForm: FormGroup;
  titlePage: string = "Create";
  authorId: number;
  errorMessage: any;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _authorService: AuthorService, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.authorId = this._avRoute.snapshot.params["id"];
    }

    this.authorForm = this._fb.group({
      id: 0,
      fullName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      cityOfOrigin: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    if (this.authorId > 0) {
      this.titlePage = "Edit";
      this._authorService.getById(this.authorId).subscribe(resp => this.authorForm.patchValue(resp), error => this.errorMessage = error);
    }
  }

  save() {

    if (!this.authorForm.valid) {
      return;
    }

    if (this.titlePage == "Create") {
      this._authorService.save(this.authorForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-author']);
        }, error => this.errorMessage = error)
    }
    else if (this.titlePage == "Edit") {
      this._authorService.update(this.authorId, this.authorForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-author']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/fetch-author']);
  }

  get fullName() { return this.authorForm.get('fullName'); }
  get dateOfBirth() { return this.authorForm.get('dateOfBirth'); }
  get cityOfOrigin() { return this.authorForm.get('cityOfOrigin'); }
  get email() { return this.authorForm.get('email'); }
}

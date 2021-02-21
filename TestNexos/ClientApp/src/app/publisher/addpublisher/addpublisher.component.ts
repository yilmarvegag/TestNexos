import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchPublisherComponent } from '../fetchpublisher/fetchpublisher.component';
import { PublisherService } from '../../services/publisherservice.service';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './addpublisher.component.html'
})

export class createpublisher implements OnInit {
  publisherForm: FormGroup;
  titlePage: string = "Create";
  publisherId: number;
  errorMessage: any;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _publisherService: PublisherService, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.publisherId = this._avRoute.snapshot.params["id"];
    }

    this.publisherForm = this._fb.group({
      id: 0,
      name: ['', [Validators.required]],
      correspondenceAddress: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      maximumBooksRegistered: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    if (this.publisherId > 0) {
      this.titlePage = "Edit";
      this._publisherService.getById(this.publisherId).subscribe(resp => this.publisherForm.patchValue(resp), error => this.errorMessage = error);
    }
  }

  save() {

    if (!this.publisherForm.valid) {
      return;
    }

    if (this.titlePage == "Create") {
      this._publisherService.save(this.publisherForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-publisher']);
        }, error => this.errorMessage = error)
    }
    else if (this.titlePage == "Edit") {
      this._publisherService.update(this.publisherId, this.publisherForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-publisher']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/fetch-publisher']);
  }

  get name() { return this.publisherForm.get('name'); }
  get correspondenceAddress() { return this.publisherForm.get('correspondenceAddress'); }
  get telephone() { return this.publisherForm.get('telephone'); }
  get email() { return this.publisherForm.get('email'); }
  get maximumBooksRegistered() { return this.publisherForm.get('maximumBooksRegistered'); }
}

import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublisherService } from '../../services/publisherservice.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Publisher } from '../../models/Publisher';

@Component({
  selector: 'app-fetch-publisher',
  templateUrl: './fetchpublisher.component.html'
})
export class FetchPublisherComponent {
  publisherPosts$: Observable<Publisher>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _publisherService: PublisherService, private _router: Router) {
  }

  ngOnInit() {
    this.loadPublisherPosts();
  }

  loadPublisherPosts() {
    this.publisherPosts$ = this._publisherService.get();
  }

  delete(publisherID) {
    var ans = confirm("Do you want to delete Publisher with Id: " + publisherID);
    if (ans) {
      this._publisherService.delete(publisherID).subscribe((data) => {
        this.loadPublisherPosts();
      }, error => console.error(error))
    }
  }
}



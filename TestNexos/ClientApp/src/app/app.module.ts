import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';

import { FetchBookComponent } from './book/fetchbook/fetchbook.component'
import { createbook } from './book/addbook/addbook.component'  
import { BookService } from './services/bookservice.service';
import { FetchPublisherComponent } from './publisher/fetchpublisher/fetchpublisher.component';
import { createpublisher } from './publisher/addpublisher/addpublisher.component';
import { PublisherService } from './services/publisherservice.service';
import { FetchAuthorComponent } from './author/fetchauthor/fetchauthor.component';
import { createauthor } from './author/addauthor/addauthor.component';
import { AuthorService } from './services/authorservice.service';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchBookComponent,
    createbook,
    FetchPublisherComponent,
    createpublisher,
    FetchAuthorComponent,
    createauthor
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-book', component: FetchBookComponent },
      { path: 'register-book', component: createbook },
      { path: 'book/edit/:id', component: createbook },
      { path: 'fetch-publisher', component: FetchPublisherComponent },
      { path: 'register-publisher', component: createpublisher },
      { path: 'publisher/edit/:id', component: createpublisher },
      { path: 'fetch-author', component: FetchAuthorComponent },
      { path: 'register-author', component: createauthor },
      { path: 'author/edit/:id', component: createauthor }
    ])
  ],
  providers: [BookService, PublisherService, AuthorService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }

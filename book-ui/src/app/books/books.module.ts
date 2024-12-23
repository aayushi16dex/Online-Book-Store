import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { FormsModule } from '@angular/forms';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { TrendingBooksComponent } from '../trending-books/trending-books.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    BooksComponent,
    ListBooksComponent,
    AddBooksComponent,
    DeleteBookComponent,
    EditBookComponent,
    ViewBookComponent,
    AdminViewComponent,
    TrendingBooksComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule
    
  ]
})
export class BooksModule { }

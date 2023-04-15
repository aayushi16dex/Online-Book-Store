import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './add-books/add-books.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

const routes: Routes = [
  { path: '', component: ListBooksComponent },
  { path: 'admin/add', component: AddBooksComponent },
  { path: 'admin/edit/:id', component: EditBookComponent },
  { path: 'admin/delete/:id', component: DeleteBookComponent },
  { path: 'view/:id', component: ViewBookComponent },
  { path: 'admin', component: AdminViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }

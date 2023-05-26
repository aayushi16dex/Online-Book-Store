import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent {
  _id: string = ""; 
  Title: string = "";
  Author: Array<any> = [];
  Genre: Array<any> = [];
  Price: Number = 0;
  Image: string = ""

  constructor(private bookService: BookService, public router: Router) { }
  addBook(formValue: NgForm) {
    console.log(formValue.value);
    const FormValue = formValue.value;

    const postBody = {
      _id: FormValue._id,
      Title: FormValue.Title,
      Price: FormValue.Price,
      Author: FormValue.Author,
      Genre: FormValue.Genre,
      Image: FormValue.Image
    }
    this.bookService.addBook(postBody).subscribe(data => {
      console.log(data);
      window.alert("Book added successfully");
      this.router.navigate(["/book/admin/"]);
    }, (err) => {
      console.log("Unable to add", err)
    })
  }
}

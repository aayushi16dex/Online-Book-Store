import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {

  _id: string = "";
  Title: string ="";
  Author: Array<any> = [];
  Genre: Array<any> = [];
  Price: Number = 0;
  Image: string = ""

  
  bookId: string = '';
  bookDetails: any;
  book: any;
  constructor(private activatedRoute: ActivatedRoute,
    private bookService: BookService, public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.bookId = data["id"];
      console.log(this.bookId)
    })

    this.bookService.viewBook(this.bookId).subscribe(data => {
      this.book = data;
      console.log(this.book)
      this.bookDetails= this.book.result;
      this._id = this.book.result._id;
      this.Title = this.book.result.Title;
      this.Author = this.book.result.Author;
      this.Genre = this.book.result.Genre;
      this.Price = this.book.result.Price;
      this.Image = this.book.result.Image;
    })
  }

  editBook(formValue: NgForm){
    console.log(formValue.value);
    const FormValue = formValue.value;

    const postBody = {
      bookId: FormValue._id,
      Title: FormValue.Title,
      Price: FormValue.Price, 
      Author: FormValue.Author,
      Genre: FormValue.Genre,
      Image : FormValue.Image
    }
    this.bookService.updateBook(postBody).subscribe(data =>{
      console.log(data);
      window.alert("Updated successfully");
      this.router.navigate(['/book/admin']);
    },(err)=>{
      console.log("Unable to update",err)
    })
  }

}

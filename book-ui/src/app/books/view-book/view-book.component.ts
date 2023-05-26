import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})

export class ViewBookComponent {

  bookId: string = '';
  bookDetails: any;
  book: any;

  constructor(private activatedRoute: ActivatedRoute,
    private bookService: BookService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.bookId = data["id"];
      console.log(this.bookId)
    })

    this.bookService.viewBook(this.bookId).subscribe(data => {
      this.book = data;
      console.log(this.book)
      this.bookDetails= this.book.result;
    })
  } 

} 

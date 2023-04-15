import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //this is a variable that hold number
  booksCount: number = 0;
  //same process
  purchasedCount: number = 0;
  clientcount: number = 0;
  customerfeedback: number = 0;

  //we have created setinterval function with arrow function and
  //and set them in a variable that is projectcountstop.
  bookcountstop: any = setInterval(() => {
    this.booksCount++;
    //we need to stop this at  particular point; will use if condition
    if (this.booksCount == 587) {
      //clearinterval will stop tha function
      clearInterval(this.bookcountstop);
    }

  }, 10) //10 is milisecond you can control it


  purchasedCountStop: any = setInterval(() => {
    this.purchasedCount++;
    if (this.purchasedCount == 315) {
      clearInterval(this.purchasedCountStop);
    }
  }, 10)


  clientcountstop: any = setInterval(() => {
    this.clientcount++;
    if (this.clientcount == 1079) {

      clearInterval(this.clientcountstop);
    }
  }, 5)

  customerfeedbackstop: any = setInterval(() => {
    this.customerfeedback++;
    if (this.customerfeedback == 100) {

      clearInterval(this.customerfeedbackstop);
    }
  }, 10)
}

import { Component, OnInit } from '@angular/core';
import { LoginSigninService } from '../login-signin.service';
export interface Book {
  name: string;
  author: string;
  press: string;
  price: number;
}
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  books: Book[];
  columns: string[] = ['name', 'author', 'press', 'price'];

  constructor(private service: LoginSigninService) { }

  ngOnInit(): void {
    this.service.sendGetRequest('/books/').subscribe((res)=> {
      this.books = res.msg;
    });

  }

}

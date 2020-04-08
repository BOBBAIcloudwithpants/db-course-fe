import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

export interface Book {
  name: string;
  author: string;
  press: string;
  price: number;
}
@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  books: Book[];
  columns: string[] = ['name', 'author', 'press', 'price'];
  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.service.sendGetRequest('/books/').subscribe((res)=> {
      this.books = res.msg;
    });

  }

}

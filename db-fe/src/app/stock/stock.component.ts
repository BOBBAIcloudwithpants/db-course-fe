import { Component, OnInit } from '@angular/core';
export interface Book {
  name: string;
  single_price: number;
  had: number;
  sold: number;
  total_sold: number;
}
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  books: Book[];

  constructor() { }

  ngOnInit(): void {

  }

}

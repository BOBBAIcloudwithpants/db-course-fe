import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface Book {
  name: string;
  author: string;
  press: string;
  price: number;
  position: number;
  buynum: number;
}
@Component({
  selector: 'app-book-purchase',
  templateUrl: './book-purchase.component.html',
  styleUrls: ['./book-purchase.component.css']
})
export class BookPurchaseComponent implements OnInit {
  
  books: Book[];
  columns: string[] = ['select','input','name', 'author', 'press', 'price'];
  dataSource = new MatTableDataSource<Book>(this.books);
  selection = new SelectionModel<Book>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  constructor(private service: BookService) {
    this.service.sendGetRequest('/books/').subscribe((res)=> {
      this.books = res.msg;
      this.dataSource = new MatTableDataSource<Book>(this.books);
      this.selection = new SelectionModel<Book>(true, []);
      console.log(this.selection)

    });

   }

  ngOnInit(): void {
  }

}

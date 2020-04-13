import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BookService} from '../book.service'
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Book {
  book_id: any;
  name: string;
  author: string;
  press: string;
  price: number;
  had: number;
  position: number;
  buynum: number;
}

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: ['./book-return.component.css']
})
export class BookReturnComponent implements OnInit {
  selection = new SelectionModel<Book>(true, []);
  books: Book[];
  columns: string[] = ['book_id', 'select','input',,'name', 'author', 'press', 'price', 'had'];
  dataSource: MatTableDataSource<Book>;
  constructor(private service: BookService, private snackbar: MatSnackBar) {
    this.service.sendGetRequest('/books/had').subscribe((res)=> {
      this.books = res.msg;
      this.dataSource = new MatTableDataSource<Book>(this.books);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<Book>(true, []);
    });
   }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  onKey(event: KeyboardEvent, element: any, num: number){
    element.buynum = num;
    console.log(element.buynum, num);
  }

  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  submitPurchase(){
    console.log(this.selection.selected);
    this.service.sendPostRequest(this.selection.selected, '/books/buy').subscribe((res) => {
      console.log(res)
      if (res.result == 200) {
        this.snackbar.open(res.msg, "close", {
          duration: 2000
        })
      }else{
        this.snackbar.open(res.msg, "close", {
          duration: 2000
        })
      }
    });
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit(): void {
    
  }
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}

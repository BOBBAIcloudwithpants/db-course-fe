import { Component, OnInit , ViewChild} from '@angular/core';
import { BookService } from '../book.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookDialogComponent} from '../book-dialog/book-dialog.component'

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
  selector: 'app-book-sale',
  templateUrl: './book-sale.component.html',
  styleUrls: ['./book-sale.component.css']
})
export class BookSaleComponent implements OnInit {

  selection = new SelectionModel<Book>(true, []);
  books: Book[];
  columns: string[] = ['book_id', 'select','input','name', 'author', 'press', 'price', 'had'];
  dataSource: MatTableDataSource<Book>;
  constructor(private service: BookService, private snackbar: MatSnackBar, public dialog: MatDialog) {
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
    if(num >= element.had || num < 0){
      alert("请输入大于等于０并且小于库存量："+element.had+" 的整数");
      element.buynum = 0;
      num = 0;
    }
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
    this.service.sendPostRequest(this.selection.selected, '/books/sell').subscribe((res) => {
      console.log(res)
      if (res.result == 200) {
        this.snackbar.open(res.msg, "close", {
          duration: 2000
        })
        let dialogRef = this.dialog.open(BookDialogComponent, {
          width: "700px",
          height: "700px",
          data: this.selection.selected
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

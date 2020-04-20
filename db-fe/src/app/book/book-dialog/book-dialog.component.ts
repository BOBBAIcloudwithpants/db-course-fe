import { Chart } from '@antv/g2'
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { OnInit , ViewChild, Component, Inject} from '@angular/core';
import { BookService } from '../book.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent implements OnInit {

  book: Book[];
  displayedColumns: string[] = [
    'name',
    'author',
    'press',
    'price',
    'buynum'
  ]

  columnsToDisplay: string[] = this.displayedColumns.slice()
  dataSources: MatTableDataSource<Book>;
  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.book = data
    }
    ngOnInit(): void {
    }
    onNoClick(): void {
      this.dialogRef.close()
    }
}

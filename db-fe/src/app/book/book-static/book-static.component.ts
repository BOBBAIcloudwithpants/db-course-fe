import { Chart } from '@antv/g2'
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit , ViewChild} from '@angular/core';
import { BookService } from '../book.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
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
  selector: 'app-book-static',
  templateUrl: './book-static.component.html',
  styleUrls: ['./book-static.component.css']
})
export class BookStaticComponent implements OnInit {
  selection = new SelectionModel<Book>(true, []);
  books: Book[];
  columns: string[] = ['book_id', 'name', 'author', 'press', 'price', 'had', 'day', 'month', 'year'];
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
 
   getYear(book_id: any){

   }

   getMonth(book_id: any){

  }

   getDay(book_id: any){
     
   }

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
 
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 
   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }

  ngOnInit(): void {

  }

  



}

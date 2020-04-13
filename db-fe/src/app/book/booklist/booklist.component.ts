import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BookService} from '../book.service'
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Book {
  name: string;
  author: string;
  press: string;
  price: number;
  had: number;
}
@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  books: Book[];
  columns: string[] = ['name', 'author', 'press', 'price', 'had'];
  dataSource: MatTableDataSource<Book>;
  constructor(private service: BookService, private snackbar: MatSnackBar) { 
    this.service.sendGetRequest('/books').subscribe((res)=> {
      this.books = res.msg;
      this.dataSource = new MatTableDataSource<Book>(this.books);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    });

  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {

  }
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

insertBook(bookname: string, author: string, press: string, price: string){
  let book: Book = {
    name: bookname,
    author: author,
    press: press,
    price: Number(price),
    had: 0
  }
  this.service.sendPostRequest(book, '/books/insert').subscribe((res) => {
    console.log(res);
    if(res.result == 200){
      this.snackbar.open("插入新书成功！请刷新浏览器查看", "close", {
        duration: 2000
      })
    }else{
      this.snackbar.open(res.msg, "close", {
        duration: 2000
      })
    }
  })
}
}




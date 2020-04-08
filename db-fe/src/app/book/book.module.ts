import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table' 
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book/book.component';
import { BooklistComponent } from './booklist/booklist.component';


@NgModule({
  declarations: [BookComponent, BooklistComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatTableModule
  ],

})
export class BookModule { }

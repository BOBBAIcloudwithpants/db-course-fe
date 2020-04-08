import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookPurchaseComponent } from './book-purchase/book-purchase.component';



const routes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    children: [
      {
        path:'',
        component: BooklistComponent
      },
      {
        path: 'purchase',
        component: BookPurchaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }

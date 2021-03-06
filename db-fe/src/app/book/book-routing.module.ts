import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookPurchaseComponent } from './book-purchase/book-purchase.component';
import { BookReturnComponent } from './book-return/book-return.component';
import { BookSaleComponent } from './book-sale/book-sale.component';
import { BookStaticComponent } from './book-static/book-static.component';
import { BookStaticTotalComponent } from './book-static-total/book-static-total.component';



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
      },
      {
        path: 'return', 
        component: BookReturnComponent
      },
      {
        path: 'sale',
        component: BookSaleComponent
      },
      {
        path: 'static',
        component: BookStaticComponent
      },
      {
        path: 'total',
        component: BookStaticTotalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }

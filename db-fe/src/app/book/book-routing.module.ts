import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooklistComponent } from './booklist/booklist.component';



const routes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    children: [
      {
        path:'',
        component: BooklistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }

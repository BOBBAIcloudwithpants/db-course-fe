import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { DetailComponent } from './detail/detail.component';
import { IndexComponent } from './index/index.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    data: {
      title: '登陆界面'
    }
  },
  {
    path: 'user/:username',
    component: DetailComponent,
    data: {
      title: '用户界面'
    }
  },
  {
    path: '/books',
    component: StockComponent,
    data: {
      title: '全部书籍'
    }
  },
  {
    path: '**', 
    component : PagenotfoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

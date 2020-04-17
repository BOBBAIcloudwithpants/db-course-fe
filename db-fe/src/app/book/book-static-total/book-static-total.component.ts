import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-book-static-total',
  templateUrl: './book-static-total.component.html',
  styleUrls: ['./book-static-total.component.css'],
})
export class BookStaticTotalComponent implements OnInit {
  chart_day: Chart;
  chart_month: Chart;
  chart_year: Chart;
  chart_total: Chart;
  days;
  months;
  years;
  total;

  changeToArea(type: string) {
    if (type == 'graph_year') {
      this.chart_year.clear();
      this.chart_year.data(this.years);
      this.chart_year
        .area()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_year.render();
    } else if (type == 'graph_month') {
      this.chart_month.clear();
      this.chart_month.data(this.months);
      this.chart_month
        .area()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_month.render();
    } else {
      this.chart_day.clear();
      this.chart_day.data(this.days);
      this.chart_day
        .area()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_day.render();
    }
  }
  changeToDot(type: string) {
    if (type == 'graph_year') {
      this.chart_year.clear();
      this.chart_year.data(this.years);
      this.chart_year
        .point()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_year.render();
    } else if (type == 'graph_month') {
      this.chart_month.clear();
      this.chart_month.data(this.months);
      this.chart_month
        .point()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_month.render();
    } else {
      this.chart_day.clear();
      this.chart_day.data(this.days);
      this.chart_day
        .point()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_day.render();
    }
  }

  changeToBing(){
    this.chart_total.clear()
    this.chart_total.coordinate('theta', {
      radius: 0.75
    })
    this.chart_total.data(this.total)
    
    this.chart_total.interval().position('sale').color('bookname').label('sale', {
      content: (data) => {
        return `${data.bookname}: ${data.sale}`;
      }
    }).adjust('stack')


    this.chart_total.render()
  }

  changeToFold(){

  }

  changeToZhu(){
    console.log(123)
    this.chart_total.destroy()
    this.chart_total = new Chart({
      container: 'graph_total',
      width: 600,
      height: 600,
    });
    this.chart_day.coordinate('rect');
    this.chart_total.data(this.total)
    this.chart_total.interval().position('bookname*sale').color('bookname');
    this.chart_total.render()
  }
  changeToLine(type: string) {
    if (type == 'graph_year') {
      this.chart_year.clear();
      this.chart_year.data(this.years);
      this.chart_year
        .line()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_year.render();
    } else if (type == 'graph_month') {
      this.chart_month.clear();
      this.chart_month.data(this.months);
      this.chart_month
        .line()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_month.render();
    } else {
      this.chart_day.clear();
      this.chart_day.data(this.days);
      this.chart_day
        .line()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_day.render();
    }
  }
  format(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;
    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var second = date.getSeconds();
    second = second < 10 ? '0' + second : second;
    return y + '-' + m + '-' + d;
  }
  constructor(private service: BookService) {}
  ngOnInit(): void {
    this.chart_total = new Chart({
      container: 'graph_total',
      width: 600,
      height: 600,
    });
    this.chart_day = new Chart({
      container: 'graph_day',
      width: 600,
      height: 600,
    });

    this.chart_month = new Chart({
      container: 'graph_month',
      width: 600,
      height: 600,
    });

    this.chart_year = new Chart({
      container: 'graph_year',
      width: 600,
      height: 600,
    });
  }
  
  submitInterval(date1: any, date2: any) {
    let start_date = this.format(date1._selected);
    let end_date = this.format(date2._selected);

    let temp = {
      start: start_date,
      end: end_date,
    };

    

    this.service.sendPostRequest(temp, '/books/static').subscribe((res) => {
      this.years = res.msg.year_sale;
      this.months = res.msg.month_sale;
      this.days = res.msg.day_sale;
      this.total = res.msg.total_sale;

      this.chart_day.data(this.days);
      this.chart_month.data(this.months);
      this.chart_year.data(this.years);
      this.chart_total.data(this.total);

      this.chart_total.interval().position('bookname*sale').color('bookname');

      this.chart_day
        .point()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_month
        .point()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_year
        .point()
        .position('date*sale')
        .color('bookname')
        .shape('bookname')
        .size(6);
      this.chart_total.render();
      this.chart_day.render();
      this.chart_month.render();
      this.chart_year.render();
    });
  }
}

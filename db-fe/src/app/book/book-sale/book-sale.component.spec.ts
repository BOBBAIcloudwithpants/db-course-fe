import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSaleComponent } from './book-sale.component';

describe('BookSaleComponent', () => {
  let component: BookSaleComponent;
  let fixture: ComponentFixture<BookSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPurchaseComponent } from './book-purchase.component';

describe('BookPurchaseComponent', () => {
  let component: BookPurchaseComponent;
  let fixture: ComponentFixture<BookPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

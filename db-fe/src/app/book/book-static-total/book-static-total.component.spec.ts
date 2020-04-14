import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStaticTotalComponent } from './book-static-total.component';

describe('BookStaticTotalComponent', () => {
  let component: BookStaticTotalComponent;
  let fixture: ComponentFixture<BookStaticTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookStaticTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStaticTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

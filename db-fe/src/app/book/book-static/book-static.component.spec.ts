import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStaticComponent } from './book-static.component';

describe('BookStaticComponent', () => {
  let component: BookStaticComponent;
  let fixture: ComponentFixture<BookStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

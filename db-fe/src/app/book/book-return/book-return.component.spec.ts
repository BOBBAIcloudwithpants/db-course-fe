import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReturnComponent } from './book-return.component';

describe('BookReturnComponent', () => {
  let component: BookReturnComponent;
  let fixture: ComponentFixture<BookReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

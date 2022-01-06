import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneContactComponent } from './one-contact.component';

describe('OneContactComponent', () => {
  let component: OneContactComponent;
  let fixture: ComponentFixture<OneContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

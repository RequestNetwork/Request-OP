import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoshopComponent } from './cryptoshop.component';

describe('CryptoshopComponent', () => {
  let component: CryptoshopComponent;
  let fixture: ComponentFixture<CryptoshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

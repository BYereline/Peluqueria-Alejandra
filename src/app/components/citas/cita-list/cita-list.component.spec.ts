import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaListComponent } from './cita-list.component';

describe('CitaListComponent', () => {
  let component: CitaListComponent;
  let fixture: ComponentFixture<CitaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

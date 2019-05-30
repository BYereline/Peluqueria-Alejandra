import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsteticaComponent } from './estetica.component';

describe('EsteticaComponent', () => {
  let component: EsteticaComponent;
  let fixture: ComponentFixture<EsteticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsteticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsteticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

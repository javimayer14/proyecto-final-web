import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevamientoInicialComponent } from './relevamiento-inicial.component';

describe('RelevamientoInicialComponent', () => {
  let component: RelevamientoInicialComponent;
  let fixture: ComponentFixture<RelevamientoInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelevamientoInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevamientoInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

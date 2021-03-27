import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevamientoInicialEdComponent } from './relevamiento-inicial-ed.component';

describe('RelevamientoInicialEdComponent', () => {
  let component: RelevamientoInicialEdComponent;
  let fixture: ComponentFixture<RelevamientoInicialEdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelevamientoInicialEdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevamientoInicialEdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

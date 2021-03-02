import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoInfoComponent } from './proyecto-info.component';

describe('ProyectoInfoComponent', () => {
  let component: ProyectoInfoComponent;
  let fixture: ComponentFixture<ProyectoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

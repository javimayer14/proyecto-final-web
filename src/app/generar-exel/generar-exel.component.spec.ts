import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarExelComponent } from './generar-exel.component';

describe('GenerarExelComponent', () => {
  let component: GenerarExelComponent;
  let fixture: ComponentFixture<GenerarExelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarExelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarExelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

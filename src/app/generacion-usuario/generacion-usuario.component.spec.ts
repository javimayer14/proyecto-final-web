import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionUsuarioComponent } from './generacion-usuario.component';

describe('GeneracionUsuarioComponent', () => {
  let component: GeneracionUsuarioComponent;
  let fixture: ComponentFixture<GeneracionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneracionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

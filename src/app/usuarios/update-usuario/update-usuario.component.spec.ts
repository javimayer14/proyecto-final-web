import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsuarioComponent } from './update-usuario.component';

describe('UpdateUsuarioComponent', () => {
  let component: UpdateUsuarioComponent;
  let fixture: ComponentFixture<UpdateUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

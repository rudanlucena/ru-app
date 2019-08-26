import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTituloPage } from './cadastro-titulo.page';

describe('CadastroTituloPage', () => {
  let component: CadastroTituloPage;
  let fixture: ComponentFixture<CadastroTituloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroTituloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTituloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

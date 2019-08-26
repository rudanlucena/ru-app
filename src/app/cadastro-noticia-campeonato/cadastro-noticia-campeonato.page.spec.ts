import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroNoticiaCampeonatoPage } from './cadastro-noticia-campeonato.page';

describe('CadastroNoticiaCampeonatoPage', () => {
  let component: CadastroNoticiaCampeonatoPage;
  let fixture: ComponentFixture<CadastroNoticiaCampeonatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroNoticiaCampeonatoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroNoticiaCampeonatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

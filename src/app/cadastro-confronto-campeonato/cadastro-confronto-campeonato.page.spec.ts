import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConfrontoCampeonatoPage } from './cadastro-confronto-campeonato.page';

describe('CadastroConfrontoCampeonatoPage', () => {
  let component: CadastroConfrontoCampeonatoPage;
  let fixture: ComponentFixture<CadastroConfrontoCampeonatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroConfrontoCampeonatoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroConfrontoCampeonatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

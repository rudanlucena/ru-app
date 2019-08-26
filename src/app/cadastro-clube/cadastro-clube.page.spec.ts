import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroClubePage } from './cadastro-clube.page';

describe('CadastroClubePage', () => {
  let component: CadastroClubePage;
  let fixture: ComponentFixture<CadastroClubePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroClubePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroClubePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

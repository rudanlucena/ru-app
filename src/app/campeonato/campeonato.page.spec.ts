import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatoPage } from './campeonato.page';

describe('CampeonatoPage', () => {
  let component: CampeonatoPage;
  let fixture: ComponentFixture<CampeonatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampeonatoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampeonatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

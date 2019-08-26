import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadorPage } from './jogador.page';

describe('JogadorPage', () => {
  let component: JogadorPage;
  let fixture: ComponentFixture<JogadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

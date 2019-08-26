import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClubePage } from './editar-clube.page';

describe('EditarClubePage', () => {
  let component: EditarClubePage;
  let fixture: ComponentFixture<EditarClubePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarClubePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarClubePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

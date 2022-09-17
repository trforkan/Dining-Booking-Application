import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxEditorComponent } from './dialogbox-editor.component';

describe('DialogboxEditorComponent', () => {
  let component: DialogboxEditorComponent;
  let fixture: ComponentFixture<DialogboxEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogboxEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogboxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

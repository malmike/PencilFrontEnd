import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TextEditorComponent } from './text-editor.component';

describe('TextEditorComponent', () => {
  let component: TextEditorComponent;
  let fixture: ComponentFixture<TextEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TextEditorComponent],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorComponent);
    component = fixture.componentInstance;
    spyOn(component, 'initialiseMediumEditor');
    spyOn(component, 'writeValueToEditor');
    spyOn(component, 'mediumEditorChanged');
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

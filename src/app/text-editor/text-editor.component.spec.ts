import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseService } from '../services/firebase.service';
import { MockAngularFirestore } from '../tests/mocks/angularFire.mock';
import MockAngularFireAuth from '../tests/mocks/angularFireAuth.mock';

import { TextEditorComponent } from './text-editor.component';

describe('TextEditorComponent', () => {
  let component: TextEditorComponent;
  let fixture: ComponentFixture<TextEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TextEditorComponent],
      providers: [
        FirebaseService,
        {
          provide: AngularFireAuth,
          useClass: MockAngularFireAuth,
        },
        {
          provide: AngularFirestore,
          useClass: MockAngularFirestore,
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorComponent);
    const firebaseService = TestBed.inject(FirebaseService);
    spyOnProperty(firebaseService, 'user').and.returnValue({uid: 'test-id'})
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

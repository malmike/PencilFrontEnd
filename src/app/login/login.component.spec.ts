import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import MockAngularFireAuth from '../tests/mocks/angularFireAuth.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          withValue: {
            googleAuth: () => Promise.resolve(),
          }
        },
        {
          provide: AngularFireAuth,
          useClass: MockAngularFireAuth,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

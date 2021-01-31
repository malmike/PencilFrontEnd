import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AngularFireAuth } from '@angular/fire/auth';
import MockAngularFireAuth from './tests/mocks/angularFireAuth.mock';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let angularFireAuth: AngularFireAuth;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AngularFireAuth,
          useClass: MockAngularFireAuth,
        }
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    angularFireAuth = TestBed.inject(AngularFireAuth);
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});

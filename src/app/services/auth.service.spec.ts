import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from "firebase/app";

import { AuthService } from './auth.service';
import MockAngularFireAuth from '../tests/mocks/angularFireAuth.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let angularFireAuth: AngularFireAuth;
  let injector;
  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        {
          provide: AngularFireAuth,
          useClass: MockAngularFireAuth,
        },
        {
          provide: Router,
          useValue: { navigate: () => {} },
        },
      ]
    });
    authService = injector.inject(AuthService);
    angularFireAuth = injector.inject(AngularFireAuth);
  });

  describe('googleAuth', () => {
    it('should call signInWithPopup method', () => {
      spyOn(authService, 'createGoogleAuthProvider').and.returnValue({} as firebase.auth.GoogleAuthProvider);
      const signInWithPopupSpy = spyOn(angularFireAuth, 'signInWithPopup').and.callThrough();
      authService.googleAuth();
      expect(signInWithPopupSpy).toHaveBeenCalled();
    });
  });
})

import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  createGoogleAuthProvider(): firebase.auth.GoogleAuthProvider {
    return new firebase.auth.GoogleAuthProvider();
  }

  googleAuth() {
    return this._authLogin(this.createGoogleAuthProvider());
  }

  signOut() {
    this.angularFireAuth.signOut().then(
      () => {
        this.router.navigate(['login']);
      }
    ).catch((error) => {
      console.error(error);
    })
  }

  private _authLogin(provider: firebase.auth.AuthProvider) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then(() => {
        this.router.navigate(['text-editor']);
      }).catch((error) => {
        console.error(error)
      });
  }
}

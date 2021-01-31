import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService{
  //@ts-ignore
  private user$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);
  private token: string | null = "";

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.listenForUser();
  }

  listenForUser(){
    this._angularFireAuth.onAuthStateChanged(user => {
      if (user) {
        this.user$.next(user);
        this._getAuth().subscribe(token => {
          this.token = token;
        })
      }
    })
  }

  private _getAuth(): Observable<string | null>{
    return this._angularFireAuth.idToken;
  }

  get user() {
    return this.user$.value;
  }

  get userId() {
    if (!this.user) {
      this.router.navigate(['login']);
      throw new Error('no user');
    }
    return this.user.uid;
  }

  get userDocPath() {
    const userId = this.userId;
    return `users/${userId}`
  }

  get pathTextDocs() {
    const userDocPath = this.userDocPath;
    return `${userDocPath}/textDocs`;
  }
}

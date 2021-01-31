import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  loggedIn = false;
  subscription: Subscription = new Subscription();

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  async ngOnInit() {
    this.subscription = this.angularFireAuth.authState.subscribe((user) => {
      console.log(`User`)
      console.log(user);
      this.loggedIn = !!user;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signOut() {
    console.log('This is meant to sign out');
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  loggedIn = false;
  subscription: Subscription = new Subscription();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    this.subscription = this.angularFireAuth.user.subscribe((user) => {
      this.loggedIn = !!user;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signOut() {
    this.authService.signOut();
  }
}

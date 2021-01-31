import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { LoginComponent } from "./login/login.component";

const redirectUnAuthorisedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToTextEditor = () => redirectLoggedInTo(['login']);

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: 'full' },
  {
    path: "login",
    component: LoginComponent,
    ...canActivate(redirectLoggedInToTextEditor)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}




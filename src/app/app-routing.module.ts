import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";

import { LoginComponent } from "./login/login.component";
import { TextEditorComponent } from "./text-editor/text-editor.component";

const redirectUnAuthorisedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToTextEditor = () => redirectLoggedInTo(['text-editor']);

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: 'full' },
  {
    path: "login",
    component: LoginComponent,
    ...canActivate(redirectLoggedInToTextEditor),
  },
  {
    path: "text-editor",
    component: TextEditorComponent,
    ...canActivate(redirectUnAuthorisedToLogin)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}




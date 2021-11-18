import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/home/header/header.component';
import { BodyComponent } from './components/home/body/body.component';
  
const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    {path: '', component: HeaderComponent, children: [
      {path: '', component: BodyComponent}]
  }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

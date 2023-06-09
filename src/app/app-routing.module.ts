import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nav', component: NavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chatbox', component: ChatboxComponent},
  { path: 'client', component: ClientComponent},
  {path: 'admin', component:AdminComponent},

  
  
  { path: 'access', loadChildren: () => import('./access/access.module').then(opt => opt.AccessModule) },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


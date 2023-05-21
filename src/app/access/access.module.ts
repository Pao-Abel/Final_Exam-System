import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way data binding

import { AccessRoutingModule } from './access-routing.module';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccessRoutingModule,
  ],
  providers: [

  ]
})
export class AccessModule { }

import { MaterialModule } from './../Material/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';



@NgModule({
  declarations: [
    HomeComponent,
    DialogboxComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ]
})
export class PageModule { }

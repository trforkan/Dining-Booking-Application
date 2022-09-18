import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import { DialogboxEditorComponent } from './components/dialogbox-editor/dialogbox-editor.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';



@NgModule({
  declarations: [
    HomeComponent,
    DialogboxComponent,
    DialogboxEditorComponent,
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'booking/:id', component: BookingDetailsComponent},
    ])
  ]
})
export class PageModule { }

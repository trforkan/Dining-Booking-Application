import { BookTable } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { group } from '@angular/animations';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  bookingInfoForm: FormGroup = this.fb.group({
    Name: [''],
    Email: [''],
    Phone_Number: [''],
    Booking_Date: [''],
    Booking_Time: [''],
    Dining_Space: [''],
    Occasion: ['']
  });

  constructor(private fb: FormBuilder) { }

  bookingInformation?: BookTable;

  ngOnInit(): void {
  }

  display() {
    this.bookingInformation = this.bookingInfoForm.value;
    console.log(this.bookingInformation);
  }

}

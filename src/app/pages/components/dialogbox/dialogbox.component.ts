import { RestApiService } from './../../../Rest-Api/rest-api.service';
import { BookTable } from './../../../Model/models';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';



@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  bookingTimes=[
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM"
  ];

  @Input() bookedInformation?: BookTable;

  bookingInfoForm: FormGroup = this.fb.group({
    Name: [this.bookedInformation?.Name],
    Email: [this.bookedInformation?.Email],
    Phone_Number: [this.bookedInformation?.Phone_Number],
    Booking_Date: [this.bookedInformation?.Booking_Date],
    Booking_Time: [this.bookedInformation?.Booking_Time],
    Dining_Space: [this.bookedInformation?.Dining_Space],
    Occasion: [this.bookedInformation?.Dining_Space]
  });

  constructor(private fb: FormBuilder, public Api: RestApiService) {
  }

  bookingInformation?: BookTable;

  ngOnInit(): void {
  }

  display() {
    this.bookingInformation = this.bookingInfoForm.value;
    console.log(this.bookingInformation);
    this.Api.post(<BookTable>this.bookingInformation);

  }




}

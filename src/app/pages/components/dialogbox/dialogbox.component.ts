import { RestApiService } from './../../../Rest-Api/rest-api.service';
import { BookTable } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  public minDate: Date = new Date('8/3/2017 9:00 AM');
  public maxDate: Date = new Date('8/3/2017 11:30 AM');
  public dateValue: Date = new Date('8/3/2017 10:00 AM');

  bookingInfoForm: FormGroup = this.fb.group({
    Name: [''],
    Email: [''],
    Phone_Number: [''],
    Booking_Date: [''],
    Booking_Time: [''],
    Dining_Space: [''],
    Occasion: ['']
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

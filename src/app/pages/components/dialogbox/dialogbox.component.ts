import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../../../BookingService/BookingService';
import { BookTable } from '../../../Model/booking.models';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  dialogType = "UPDATE"

  bookingTimes = [
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
  @Input() viewInformation = false;

  bookingInfoForm: FormGroup = this.fb.group({
    Name: [this.bookedInformation?.Name],
    Email: [this.bookedInformation?.Email],
    Phone_Number: [this.bookedInformation?.Phone_Number],
    Booking_Date: [this.bookedInformation?.Booking_Date],
    Booking_Time: [this.bookedInformation?.Booking_Time],
    Dining_Space: [this.bookedInformation?.Dining_Space],
    Occasion: [this.bookedInformation?.Occasion]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public bookedData: any, private snackbar: MatSnackBar, private fb: FormBuilder, public bookingService: BookingService, public dialogRef: MatDialogRef<DialogboxComponent>) {
  }

  bookingInformation?: BookTable;

  ngOnInit(): void {

    console.log(this.bookingInformation)

    this.dialogType = this.bookedData.bookType;

    this.bookingInfoForm = this.fb.group({
      Name: [this.bookedInformation?.Name],
      Email: [this.bookedInformation?.Email],
      Phone_Number: [this.bookedInformation?.Phone_Number],
      Booking_Date: [this.bookedInformation?.Booking_Date],
      Booking_Time: [this.bookedInformation?.Booking_Time],
      Dining_Space: [this.bookedInformation?.Dining_Space],
      Occasion: [this.bookedInformation?.Occasion]
    });
    console.log(this.bookingInfoForm);
  }

  closeDialog() {

    console.log("closed")
    setTimeout(()=>{
      this.snackbar.dismiss,
      this.closeDialog();
    },1500);

    this.dialogRef.close();
  }

  addBooking() {
    this.bookingInformation = this.bookingInfoForm.value;
    console.log(this.bookingInformation);

    this.bookingService.post(<BookTable>this.bookingInformation);

    this.snackbar.open("Booking list updated Successfully");
    setTimeout(()=> {
      this.snackbar.dismiss();
    },1500)

  }

  display(event: any) {
    console.log(event);
    this.bookingInfoForm = this.fb.group({
      Name: [this.bookedInformation?.Name],
      Email: [this.bookedInformation?.Email],
      Phone_Number: [this.bookedInformation?.Phone_Number],
      Booking_Date: [this.bookedInformation?.Booking_Date],
      Booking_Time: [this.bookedInformation?.Booking_Time],
      Dining_Space: [event],
      Occasion: [this.bookedInformation?.Dining_Space]
    });
  }


}

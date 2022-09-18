import { BookingService } from '../../../BookingService/BookingService';
import { BookTable } from '../../../Model/booking.models';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox-editor',
  templateUrl: './dialogbox-editor.component.html',
  styleUrls: ['./dialogbox-editor.component.scss']
})
export class DialogboxEditorComponent implements OnInit {

  bookingInfo?: BookTable;
  edit: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public bookedData: any , private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingInfo = this.bookingService.getBooking(this.bookedData.bookedInformation)
    console.log(this.bookingInfo),
    this.edit=this.bookedData.edit;
    console.log(this.edit);
  }

}

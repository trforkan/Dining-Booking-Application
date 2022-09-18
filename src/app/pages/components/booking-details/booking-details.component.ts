import { BookingService } from '../../../BookingService/BookingService';
import { BookTable } from '../../../Model/booking.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  bookedDetails?: BookTable;

  constructor(private route: ActivatedRoute ,private bookingService: BookingService) { }

  ngOnInit(): void {

    this.route.params.subscribe(({id})=>{
      setTimeout(()=>{
        this.loadInformation(id);
      },500);
    });
  }

  loadInformation(id: number){
    this.bookedDetails = this.bookingService.getBooking(id);
  }

}

import { RestApiService } from './../../../Rest-Api/rest-api.service';
import { BookTable } from './../../../Model/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  keyValue?: number;

  bookedDetails?: BookTable;

  constructor(private route: ActivatedRoute ,private api: RestApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(({id})=>{
      // console.log(id);
      this.keyValue=id;
      // console.log(this.keyValue)
      this.bookedDetails = this.api.getBooking(id);
      console.log(this.bookedDetails);
      console.log(this.bookedDetails?.Name)
    })
  }

}

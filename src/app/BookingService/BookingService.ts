import { BookTable } from '../Model/booking.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  allBookings: BookTable[]=[];

  constructor(private http: HttpClient) {}

  post(bookingInformation: BookTable){

    // console.log(bookingInformation);

    this.allBookings?.splice(0);

    if(localStorage.length > 0){
      for(let i=0; i<JSON.parse(localStorage['Bookings']).length;i++){
        console.log(JSON?.parse(localStorage['Bookings'])[i]);
        this.allBookings.push(JSON?.parse(localStorage['Bookings'])[i]);
      }
    }



    this.allBookings.push(bookingInformation);

    localStorage.clear();
    localStorage.setItem("Bookings", JSON?.stringify(this.allBookings));

  }

  getBookings(){

    for(let i=0; i<JSON?.parse(localStorage['Bookings']).length;i++){
      // console.log(JSON?.parse(localStorage['Bookings'])[i]);
      this.allBookings?.push(JSON?.parse(localStorage['Bookings'])[i]);
    }
    console.log(this.allBookings)
    return this.allBookings;
  }


  deleteBooking(keyValue: number) {

    this.allBookings.splice(0);

    for(let i=0; i<JSON?.parse(localStorage['Bookings']).length;i++){
      let object = JSON?.parse(localStorage['Bookings'])[i];
      if(object.PhoneNumber != keyValue)this.allBookings.push(object);
    }
    localStorage.clear();
    localStorage.setItem("Bookings", JSON?.stringify(this.allBookings));
  }

  getBooking(keyValue: number) {

    // this.allBookings.splice(0);

    for(let i=0; i<JSON?.parse(localStorage['Bookings']).length;i++){
      let object = JSON?.parse(localStorage['Bookings'])[i];
      console.log(object);
      if(object.PhoneNumber == keyValue)return object;
    }

    return null;
    // return JSON.parse(localStorage.getItem(keyValue) as string)
  }

  update(updatedObject: BookTable) {

    // console.log("editor")
    this.allBookings.splice(0);

    for(let i=0; i<JSON?.parse(localStorage['Bookings']).length;i++){
      let object = JSON?.parse(localStorage['Bookings'])[i];
      if(object.PhoneNumber == updatedObject.PhoneNumber){
        this.allBookings.push(updatedObject);
      }
      else {
        this.allBookings.push(object);
      }
    }

    localStorage.clear();
    localStorage.setItem("Bookings", JSON?.stringify(this.allBookings));


  }


}

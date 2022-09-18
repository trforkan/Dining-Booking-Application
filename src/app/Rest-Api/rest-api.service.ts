import { BookTable } from './../Model/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  allBookings?: BookTable;

  constructor(private http: HttpClient) {}

  post(bookingInformation: BookTable){

    // this.allBookings?.splice(0),
    this.allBookings = bookingInformation;//JSON.parse(localStorage?.getItem('Bookings'));

    // this.allBookings?.push(bookingInformation);
    localStorage.setItem("Bookings", JSON.stringify(this.allBookings));
    // localStorage.setItem((bookingInformation.Phone_Number).toString(), JSON.stringify(bookingInformation));

    console.log(this.allBookings);
    // for(let i=0;i<this.allBookings; i++){
      // console.log(this.allBookings[i]);
    // }

  }

  getBookings(){

    for(let i=0; i<localStorage.length;i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key as string);
      let objectValue = JSON.parse(value as string);

      console.log(objectValue);

      // this.allBookings?.push(objectValue);
    }
    console.log(this.allBookings);
    return this.allBookings;
  }

  deleteBooking(keyValue: string) {
    console.log(localStorage.getItem(keyValue))
    localStorage.removeItem(keyValue as string);
  }

  getBooking(keyValue: string) {
    // console.log(localStorage.getItem(keyValue))
    // console.log( JSON.parse(localStorage.getItem(keyValue) as string))
    return JSON.parse(localStorage.getItem(keyValue) as string)
  }


}

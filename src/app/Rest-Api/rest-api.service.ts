import { BookTable } from './../Model/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  allBookings?: BookTable[]=[];

  constructor(private http: HttpClient) {
    // this.get();
   }

  post(bookingInformation: BookTable){
    localStorage.setItem((bookingInformation.Phone_Number).toString(), JSON.stringify(bookingInformation));
  }

  getBookings(){

    for(let i=0; i<localStorage.length;i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key as string);
      let objectValue = JSON.parse(value as string);

      console.log(objectValue);

      this.allBookings?.push(objectValue);
    }
    console.log(this.allBookings);
    return this.allBookings;
  }

  deleteBooking(keyValue: string) {
    console.log(localStorage.getItem(keyValue))
    localStorage.removeItem(keyValue as string);
  }


}

import { BookTable } from './../Model/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  allBookings?: BookTable[]=[];

  constructor(private http: HttpClient) {
    this.get();
   }

  post(bookingInformation: BookTable){
    localStorage.setItem(JSON.stringify(bookingInformation.Phone_Number), JSON.stringify(bookingInformation));
  }

  get(){

    for(let i=0; i<localStorage.length;i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key as string);
      let objectValue = JSON.parse(value as string);

      console.log(objectValue);

      this.allBookings?.push(objectValue);
    }
    console.log(this.allBookings);
  }

}

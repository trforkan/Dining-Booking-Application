import { RestApiService } from './../../../Rest-Api/rest-api.service';
import { BookTable } from './../../../Model/models';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox-editor',
  templateUrl: './dialogbox-editor.component.html',
  styleUrls: ['./dialogbox-editor.component.scss']
})
export class DialogboxEditorComponent implements OnInit {

  bookingInfo?: BookTable;
  view: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public bookedData: any , private api: RestApiService) { }

  ngOnInit(): void {
    this.bookingInfo = this.api.getBooking(this.bookedData.bookedInformation.toString())
    console.log(this.bookingInfo),
    this.view=this.bookedData.view;
    console.log(this.view);
    // console.log(this.bookedData.bookedInformation)
  }

}

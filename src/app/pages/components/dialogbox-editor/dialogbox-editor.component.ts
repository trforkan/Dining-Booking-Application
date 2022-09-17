import { BookTable } from './../../../Model/models';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox-editor',
  templateUrl: './dialogbox-editor.component.html',
  styleUrls: ['./dialogbox-editor.component.scss']
})
export class DialogboxEditorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public bookedData: BookTable) { }

  ngOnInit(): void {
    // const datapaisi = this.bookedData.bookedInformation
    // console.log(datapaisi);
    console.log(this.bookedData);
    // console.log(this.bookedData.Booking_Time)
  }

}

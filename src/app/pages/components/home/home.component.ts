import { DialogboxEditorComponent } from './../dialogbox-editor/dialogbox-editor.component';
import { BookingService } from '../../../BookingService/BookingService';
import { BookTable } from '../../../Model/booking.models';
import { DialogboxComponent } from './../dialogbox/dialogbox.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'Name',
    'Email',
    'Phone_Number',
    'Booking_Date',
    'Booking_Time',
    'Dining_Space',
    'Occasion',
    'Action',
  ];

  dataSources: any;
  dataSourcesLocal?: BookTable[] = [];

  @ViewChild(MatPaginator) paginator: any | MatPaginator;

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSources.paginator = this.paginator;
    }, 2000);
    this.dataSources.paginator = this.paginator;
  }

  constructor(private router: Router, private dialog: MatDialog, private bookingService: BookingService, private snackbar: MatSnackBar) {
    // this.dataSourcesLocal = this.api.getBookings();
    this.dataSources = new MatTableDataSource<BookTable>(this.dataSourcesLocal);
    console.log(this.dataSources);
  }

  ngOnInit(): void {

    console.log(Math.floor(Math.random() * 100000));

    this.reloadData();
  }


  reloadData() {
    this.dataSourcesLocal?.splice(0);
    this.dataSourcesLocal = this.bookingService.getBookings();
    this.dataSources = new MatTableDataSource<BookTable>(this.dataSourcesLocal);
    // console.log(this.dataSources);
  }

  openDialogbox(): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '70%',
      height: '65%',
      panelClass: 'custom-dialog-container',
      data: {
        // bookedInformation,
        bookType: "BOOK NOW"
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.dataSources?.splice(0);
      this.reloadData();
    });
  }


  openDialogboxEditor(bookedInformation: number, edit: boolean): void {

    const dialogRef = this.dialog.open(DialogboxEditorComponent, {
      width: '70%',
      height: '65%',
      panelClass: 'custom-dialog-container',
      data: {
        bookedInformation,
        bookType: "UPDATE NOW",
        edit: edit
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.dataSources?.splice(0);
      this.reloadData()
    });
  }

 

  deleteBooking(keyValue: number) {




    this.bookingService.deleteBooking(keyValue);

    this.snackbar.open(`Booking Number: ${keyValue} deleted successfully`);
    setTimeout(()=>{
      this.snackbar.dismiss();
    },1500);
    // this.dataSources?.splice(0);
    this.reloadData();
  }

  updateBooking(keyValue: number) {
    this.openDialogboxEditor(keyValue as number, true);
    this.reloadData();
  }

  viewBookingInfo(keyValue: number) {
    // this.openDialogboxEditor(keyValue as number, true);
    this.router.navigateByUrl(`/booking/${keyValue}`);

  }

}

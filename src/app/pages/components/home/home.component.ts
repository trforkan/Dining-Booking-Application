import { DialogboxEditorComponent } from './../dialogbox-editor/dialogbox-editor.component';
import { BookingService } from '../../../BookingService/BookingService';
import { BookTable } from '../../../Model/booking.models';
import { DialogboxComponent } from './../dialogbox/dialogbox.component';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounce, debounceTime, fromEvent, map } from 'rxjs';

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

  filterRefValue?: string = '';

  dataSources: any;
  filteredDataSources: BookTable[] = [];
  dataSourcesLocal?: BookTable[] = [];

  @ViewChild(MatPaginator) paginator: any | MatPaginator;
  @ViewChild('searchText') searchValue?: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSources.paginator = this.paginator;
    }, 2000);
    this.dataSources.paginator = this.paginator;

    const searchContent = fromEvent<any>(this.searchValue?.nativeElement, 'keyup').pipe(
      debounceTime(500),
      map(res=> res.target.value),
    );

    searchContent.subscribe(response=>{
      console.log(response);
      this.filterRefValue=response;

      this.reloadData();

    })

  }

  constructor(private router: Router, private dialog: MatDialog, private bookingService: BookingService, private snackbar: MatSnackBar) {
    // this.dataSourcesLocal = this.api.getBookings();
    this.dataSources = new MatTableDataSource<BookTable>(this.dataSourcesLocal);
    console.log(this.dataSources);
  }

  ngOnInit(): void {

    console.log(Math.floor(Math.random() * 100000));
    console.log(this.filterRefValue)

    this.reloadData();
  }


  reloadData() {
    this.dataSourcesLocal?.splice(0);
    this.filteredDataSources?.splice(0);
    this.dataSourcesLocal = this.bookingService.getBookings();

    for(let i=0; i<this.dataSourcesLocal.length;i++){
      console.log(this.dataSourcesLocal[i]);

      if(this.dataSourcesLocal[i].PhoneNumber.includes(this.filterRefValue as string)) {
        this.filteredDataSources.push(this.dataSourcesLocal[i]);
      }

    }

    this.dataSources = new MatTableDataSource<BookTable>(this.filteredDataSources);
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



  deleteBooking(keyValue: string) {

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

  viewBookingInfo(keyValue: string) {
    // this.openDialogboxEditor(keyValue as number, true);
    console.log(keyValue);
    this.router.navigateByUrl(`/booking/${keyValue}`);

  }

}

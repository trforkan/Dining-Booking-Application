import { DialogboxEditorComponent } from './../dialogbox-editor/dialogbox-editor.component';
import { RestApiService } from './../../../Rest-Api/rest-api.service';
import { BookTable } from './../../../Model/models';
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

  constructor(private router: Router, private dialog: MatDialog, private api: RestApiService, private snackbar: MatSnackBar) {
    this.dataSourcesLocal = this.api.getBookings();
    this.dataSources = new MatTableDataSource<BookTable>(this.dataSourcesLocal);
    console.log(this.dataSources);
  }

  ngOnInit(): void { }


  reloadData() {
    this.dataSourcesLocal?.splice(0);
    this.dataSourcesLocal = this.api.getBookings();
    this.dataSources = new MatTableDataSource<BookTable>(this.dataSourcesLocal);
    console.log(this.dataSources);
  }

  openDialogbox(): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '70%',
      height: '65%',
      panelClass: 'custom-dialog-container',
      data: {
        bookType: "BOOK NOW"
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.reloadData();
    });
  }


  openDialogboxEditor(bookedInformation: number, view: boolean): void {
    const dialogRef = this.dialog.open(DialogboxEditorComponent, {
      width: '70%',
      height: '65%',
      panelClass: 'custom-dialog-container',
      data: {
        bookedInformation,
        bookType: "UPDATE NOW",
        view: view
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.reloadData()
    });
  }

  deleteBooking(keyValue: number) {
    this.api.deleteBooking(keyValue.toString());

    this.snackbar.open(`Booking Number: ${keyValue} deleted successfully`);
    setTimeout(()=>{
      this.snackbar.dismiss();
    },1500);
    this.reloadData();
  }

  updateBooking(keyValue: number) {
    this.openDialogboxEditor(keyValue as number, false);
  }

  viewBookingInfo(keyValue: number) {
    // this.openDialogboxEditor(keyValue as number, true);
    this.router.navigateByUrl(`/booking/${keyValue}`);

  }

}

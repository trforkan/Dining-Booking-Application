import { DialogboxEditorComponent } from './../dialogbox-editor/dialogbox-editor.component';
import { RestApiService } from './../../../Rest-Api/rest-api.service';
import { BookTable } from './../../../Model/models';
import { DialogboxComponent } from './../dialogbox/dialogbox.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private dialog: MatDialog, private api: RestApiService, private snackbar: MatSnackBar) {
    this.dataSourcesLocal = this.api.getBookings();
    this.dataSources = new MatTableDataSource<BookTable>(this.dataSourcesLocal);
    // console.log(this.datasourcesForkan);
    console.log(this.dataSources);
  }

  ngOnInit(): void { }

  openDialogbox(): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '70%',
      height: '65%',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  openDialogboxEditor(bookedInformation: BookTable): void {
    const dialogRef = this.dialog.open(DialogboxEditorComponent, {
      width: '70%',
      height: '65%',
      panelClass: 'custom-dialog-container',
      data: {
        bookedInformation
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  deleteBooking(keyValue: number) {
    // console.log(keyValue.toString());
    this.api.deleteBooking(keyValue.toString());
    this.snackbar.open(`Booking Number: ${keyValue} deleted successfully`);
    setTimeout(()=>{
      this.snackbar.dismiss();
    },1500);
  }

  updateBooking(keyValue: number) {
    
    let stringObj = (localStorage?.getItem(keyValue.toString()));
    let object = JSON.parse(stringObj as string);
    this.openDialogboxEditor(object)
    // console.log(JSON.parse(object as string))
  }
}

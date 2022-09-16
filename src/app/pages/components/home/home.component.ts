import { RestApiService } from './../../../Rest-Api/rest-api.service';
import { BookTable } from './../../../Model/models';
import { DialogboxComponent } from './../dialogbox/dialogbox.component';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},

];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , AfterViewInit{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSources = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSourcesLocal?: BookTable[] = [];

  @ViewChild(MatPaginator) paginator: any | MatPaginator;

  ngAfterViewInit() {
    setTimeout(() => {this.dataSources.paginator = this.paginator},5000);
    // this.dataSources.paginator = this.paginator;
  }

  constructor( private dialog: MatDialog , private api: RestApiService) {
    this.dataSourcesLocal = this.api.getBookings();
    console.log(this.dataSourcesLocal)
  }

  ngOnInit(): void {

  }

  // openDialogbox() {
  //   this.dialog.open(DialogboxComponent);
  // }
  openDialogbox(): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '70%', height: '65%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

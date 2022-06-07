import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import data from '../../../../assets/data.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tableData: any;
  copyTableData: any;
  dataSource: any;
  newTableData: any = [];
  newTableDataCopy: any = [];
  model: any = [];
  ramSize: any = [];
  ramType: any = [];
  hddSize: any = [];
  hddType: any = [];
  location: any = [];
  locationId: any = [];
  price: any = [];
  dataObj: any = {}
  displayedColumns: string[] = ['Model', 'RAM', 'RAM Type', 'HDD', 'HDD Type', 'Location', 'Price'];

  locationList: any = [];
  filterValues: any = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tableData = data;
    this.newData();
    this.dataSource = new MatTableDataSource<Element>(this.newTableData);

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  newData() {

    this.hddSize = [
      ...this.tableData.map((item: any) => {
        let x = item.HDD.split('B')[0];
        if (x[x.length - 1] == 'T') {
          x = x.slice(0, -1).split('x')
          x = (x[0] * x[1] + 'TB');
          return x;
        }
        else {
          x = x.slice(0, -1).split('x')
          x = (x[0] * x[1] + 'GB');
          return x;
        }
      })
    ];

    this.tableData.forEach((element: any,index:any) => {
      this.model = element.Model
      this.ramSize = element.RAM.slice(0, -4)
      this.ramType = element.RAM.slice(-4, element.RAM.length)
      this.hddType = element.HDD.split('B')[1]
      this.location = element.Location.slice(0, -6)
      this.locationId = element.Location.slice(-6, element.Location.length)
      this.price = element.Price

      this.newTableData.push({
        model: this.model,
        ramSize: this.ramSize,
        ramType: this.ramType,
        hddSize: this.hddSize[index],
        hddType: this.hddType,
        location: this.location,
        locationId: this.locationId,
        price: this.price
      });
    });
    console.log(this.newTableData)
    this.newTableDataCopy = this.newTableData;
  }

  goToDashboard() {
    this.router.navigate(['./dashboard']);
  }

  // filterLocation() {
  //   this.locationList = [...new Set(this.tableData.map((item: any) => item.Location))]
  //   console.log(this.locationList);
  // }


  // .filter((s: any) => (Number(s.ramSize.slice(0,-2)) >= Number(this.filterValues.ramSize.slice(0,-2))) 

  // filterRamSize() {
  //     this.newTableData = this.newTableDataCopy.filter((s: any) => (s.ramSize == this.filterValues.ramSize) && (this.filterValues.ramType ? s.ramType == this.filterValues.ramType : true) && (this.filterValues.hddSize ? s.hddSize == this.filterValues.hddSize : true) && (this.filterValues.hddType ? s.hddType == this.filterValues.hddType : true) && (this.filterValues.location ? s.location == this.filterValues.location : true));
  //     return this.newTableData;
  // }

  // filterRamType() {
  //     this.newTableData = this.newTableDataCopy.filter((s: any) => s.ramType == this.filterValues.ramType);
  //     return this.newTableData;
  // }

  getData(data: any) {
    this.filterValues = data;
    this.displayData();
  }

  displayData(){

    this.newTableData = this.newTableDataCopy.filter((s: any) => 
    (this.filterValues.ramSizeRange ? s.ramSize.slice(0,-2) >= this.filterValues.ramSizeRange : true) &&
    (this.filterValues.ramSize ? s.ramSize == this.filterValues.ramSize : true) && 
    (this.filterValues.ramType ? s.ramType == this.filterValues.ramType : true) &&
    (this.filterValues.hddSize ? s.hddSize == this.filterValues.hddSize : true) &&
    (this.filterValues.hddType ? s.hddType == this.filterValues.hddType : true) &&
    (this.filterValues.location ? s.location == this.filterValues.location : true));

    this.dataSource = new MatTableDataSource<Element>(this.newTableData);
    this.dataSource.paginator = this.paginator;

  }


}
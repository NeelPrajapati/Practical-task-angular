import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterObj:any = {}

  @Input() newTableData : any;
  // @Input() hddList : any;
  // @Input() locationList : any;
  // @Input() ramType : any;
  // @Input() hddRange : any;

  @Output() isclick = new EventEmitter()

  location : any;
  ramSize : any;
  ramType : any;
  hddSize : any;
  hddType : any;
  locationList : any;
  ramSizeList : any;
  ramTypeList : any;
  hddSizeList : any;
  hddTypeList : any;
  checked:any;
  constructor() { }

  ngOnInit(): void {
    // this.newTableData = JSON.parse(this.newTableData);
    this.ramSizeList = [ ... new Set(this.newTableData.map((s:any)=>s.ramSize))];
    this.ramTypeList = [ ... new Set(this.newTableData.map((s:any)=>s.ramType))];
    this.hddSizeList = [ ... new Set(this.newTableData.map((s:any)=>s.hddSize))];
    this.hddTypeList = [ ... new Set(this.newTableData.map((s:any)=>s.hddType))];
    this.locationList = [ ... new Set(this.newTableData.map((s:any)=>s.location))];
    console.log(this.newTableData);
  }

  onFilter(){
    // this.filterObj = {
    //   storageRangeTb:this.storageRangeTb ,
    //   storageRangeGb:this.storageRangeGb ,
    //   storageSize:this.storageSize ,
    //   location:this.location 
    // }
    this.isclick.emit(this.filterObj);
  }

  onCancel(){
    
  }

  updateSetting(){
    // this.gridsize = event.value;
  }

  updateHdd() {
    
  }
  updateLocation(){

  }
}

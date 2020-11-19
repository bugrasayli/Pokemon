import { Component, Input,Output,EventEmitter, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  constructor() {
  }
  public Test(Search : string)
  {
       this.messageEvent.emit(Search);
  }
  ngOnInit(): void {
  }

}

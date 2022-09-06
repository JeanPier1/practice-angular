import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  active: boolean = false;
  status: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  openuser() {
    this.active = !this.active;
  }
  
  openDasboard(){
    this.status = !this.status;
  }
  
}

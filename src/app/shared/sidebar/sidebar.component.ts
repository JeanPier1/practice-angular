import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  active: boolean = false;
  status: boolean = false;
  menuItems: any [] = [];

  constructor(private sidebarService:SidebarService) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {}

  openuser() {
    this.active = !this.active;
  }

  openDasboard(){
    this.status = !this.status;
  }

}

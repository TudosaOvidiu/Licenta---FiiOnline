import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  routeNames = ['Buttons', 'Carousel', 'Chips', 'Collapsible', 'Dialogs', 'Dropdown', 'Forms', 'Tabs', 'DatePicker', 'Parallax', 'ModelBindings'];

  constructor() {
  }

  ngOnInit() {
  }

}

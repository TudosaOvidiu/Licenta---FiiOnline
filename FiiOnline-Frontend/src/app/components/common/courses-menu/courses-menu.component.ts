import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-courses-menu',
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.scss', '../../../app.component.scss']
})
export class CoursesMenuComponent implements OnInit {

  public degrees = ['BSc  Year 1', 'BSc Year 2', 'BSc Year 3', 'MSc Systems Software Eng Year 1',
    'MSc Systems Software Eng Year 2', 'MSc Computational Optimization Year 1', 'MSc Computational Optimization Year 2',
    'MSc Distributed Systems Year 1', 'MSc Distributed Systems Year 2',
    'MSc Information Security Year 1', 'MSc Information Security Year 2'];

  constructor() {
  }

  ngOnInit() {
  }

}

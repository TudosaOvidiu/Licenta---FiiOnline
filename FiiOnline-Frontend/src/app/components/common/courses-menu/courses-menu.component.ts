import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-courses-menu',
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.scss', '../../../app.component.scss']
})
export class CoursesMenuComponent implements OnInit {

  public degrees = ['Bachelor\'s degree year 1', 'Bachelor\'s degree year 2', 'Bachelor\'s degree year 3', 'Masters: Systems software engineering year 1',
    'Masters: Systems software engineering year 2', 'Masters: Masters: Computational optimization year 1', 'Masters: Masters: Computational optimization year 2',
    'Masters: Distributed systems year 1', 'Masters: Distributed systems year 2',
    'Masters: Distributed systems year 1', 'Masters: Distributed systems year 2'];

  constructor() {
  }

  ngOnInit() {
  }

}

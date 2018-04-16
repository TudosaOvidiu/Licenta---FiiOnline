import {Component, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {MaterializeAction} from 'angular2-materialize';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss', '../../../app.component.scss']
})
export class CoursesListComponent implements OnInit {

  public courses;
  public courseName: string;
  public page: string;

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.page = 'admin';
    if (this.router.url === '/courses') {
      this.page = 'student';
    } else if (this.router.url === '/professor-courses') {
      this.page = 'professor';
    }

    console.log(this.page);


    this.dataService.fetchData('http://localhost:63944/Courses').subscribe(response => {
        this.courses = response;
        console.log(this.courses);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteCourse(courseName) {
    let courseId = this.courses.filter(c => c.name === courseName).map(c => c.id);
    this.dataService.deleteData(`http://localhost:63944/Courses/${courseId}`).subscribe(response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
    this.courses = this.courses.filter(c => c.name !== courseName);
    this.closeModal();
  }

  openModal(course) {
    this.courseName = course.name;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  saveCourseId(courseId) {
    sessionStorage.setItem('courseId', courseId);
    // this.router.navigate(['upload-lesson']);
  }

}

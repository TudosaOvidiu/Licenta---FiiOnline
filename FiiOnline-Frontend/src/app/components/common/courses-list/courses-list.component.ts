import {Component, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {MaterializeAction} from 'angular2-materialize';
import {ActivatedRoute, Params, Router} from '@angular/router';

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

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let role = JSON.parse(sessionStorage.getItem('user')).role;
    switch (role) {
      case 'Administrator':
        this.page = 'admin';
        break;
      case 'Professor':
        this.page = 'professor';
        break;
      case 'Student':
        this.page = 'student';
        break;
    }

    if (this.page === 'professor') {
      let prof_id = JSON.parse(sessionStorage.getItem('user')).id;
      this.dataService.fetchData(`http://localhost:63944/Courses/professor-courses/${prof_id}`).subscribe(response => {
          this.courses = response;
          console.log(this.courses);
        },
        err => {
          console.log(err);
        }
      );
    } else {

      let year = this.route.snapshot.queryParams['year'];
      let semester = this.route.snapshot.queryParams['semester'];

      this.dataService.fetchData(`http://localhost:63944/Courses/course-by-semester?year=${year}&semester=${semester}`).subscribe(response => {
          this.courses = response;
          console.log(this.courses);
        },
        err => {
          console.log(err);
        }
      );
    }


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

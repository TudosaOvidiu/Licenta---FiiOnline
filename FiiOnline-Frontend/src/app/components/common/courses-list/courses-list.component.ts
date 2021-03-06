import {Component, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {MaterializeAction} from 'angular2-materialize';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GlobalVariable} from '../../../config/global';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss', '../../../app.component.scss']
})
export class CoursesListComponent implements OnInit {

  public courses;
  public courseName: string;
  public page: string;
  private user;
  public studentCourses = [];
  public year: string;

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    switch (this.user.role) {
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
      this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Courses/professor-courses/${this.user.id}`).subscribe(response => {
          this.courses = response;
        },
        err => {
          console.log(err);
        }
      );
    } else if (this.router.url.includes('followed-courses')) {
      this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Courses/student-courses/${this.user.id}`).subscribe(response => {
          this.courses = response;
        },
        err => {
          console.log(err);
        }
      );
      this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Users/followed-courses/${this.user.id}`).subscribe(response => {
            this.studentCourses = response;
          },
          err => {
            console.log(err);
          }
        );
    } else {

      let year = this.route.snapshot.queryParams['year'];
      let semester = this.route.snapshot.queryParams['semester'];

      this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Courses/course-by-semester?year=${year}&semester=${semester}`).subscribe(response => {
          this.courses = response;
          this.year = this.courses[0].year;
        },
        err => {
          console.log(err);
        }
      );
      if (this.page === 'student') {
        this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Users/followed-courses/${this.user.id}`).subscribe(response => {
            this.studentCourses = response;
          },
          err => {
            console.log(err);
          }
        );
      }
    }


  }

  followCourse(courseId: string, functionCase: string) {
    this.dataService.postData(`${GlobalVariable.BASE_API_URL}/Courses/follower?studentId=${this.user.id}&courseId=${courseId}`, {courseId: courseId}).subscribe(response => {
      },
      err => {
        console.log(err);
      }
    );
    if (functionCase === 'follow') {
      this.studentCourses.push(courseId);
    } else {
      this.studentCourses = this.studentCourses.filter(sc => sc !== courseId);
    }
  }

  deleteCourse(courseName) {
    let courseId = this.courses.filter(c => c.name === courseName).map(c => c.id);
    this.dataService.deleteData(`${GlobalVariable.BASE_API_URL}/Courses/${courseId}`).subscribe(response => {
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

  goToLessons(courseId: string) {
    switch (this.page){
      case 'student':
        this.router.navigate([`/lessons/${courseId}`]);
        break;
      case 'professor':
        this.router.navigate([`professor-lessons/${courseId}`]);
        break;
    }
  }

}

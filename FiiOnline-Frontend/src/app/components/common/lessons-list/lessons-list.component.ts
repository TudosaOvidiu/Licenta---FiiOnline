import {Component, EventEmitter, OnInit} from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalVariable} from '../../../config/global';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss', '../../../app.component.scss']
})
export class LessonListComponent implements OnInit {

  public lessons;
  public lessonName: string;
  public studentPage = false;
  private courseId;
  public hideLecture = true;
  public hideSeminar = true;
  public hideHomework = true;
  public resourceType: string;
  private resourceId: string;
  private lesson;
  public courseName: string;


  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private dataService: DataService, private router: Router, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      if (this.router.url === '/courses') {
        this.studentPage = true;
      }
      this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Courses/course-weeks/${this.courseId}`).subscribe(response => {
          response.sort(function (a, b) {return a.weekNr - b.weekNr; });
          this.lessons = response;
          this.courseName = this.lessons[0].courseName
        },
        err => {
          console.log(err);
        }
      );
    });

  }


  deleteResource() {
    // this.dataService.deleteData(`${GlobalVariable.BASE_API_URL}/Lessons/${this.resourceId}`).subscribe(response => {
    //     console.log(response);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    let index = this.lessons.indexOf(this.lesson);
    for (let i = 0; i < 3; i++) {
      if (this.lessons[index].resourcesDtos[i].id === this.resourceId) {
        this.lessons[index].resourcesDtos[i] = undefined;
      }
    }
    this.closeModal();
  }

  openModal(resources, resourceType, lesson) {
    this.lesson = lesson;
    this.resourceType = resourceType;
    this.resourceId = resources.filter(r => r.type.toLowerCase() === resourceType).map(r => r.id)[0];
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }



}

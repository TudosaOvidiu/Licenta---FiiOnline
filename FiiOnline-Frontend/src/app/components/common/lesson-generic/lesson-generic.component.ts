import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-lesson-generic',
  templateUrl: './lesson-generic.component.html',
  styleUrls: ['./lesson-generic.component.scss', '../../../app.component.scss']
})
export class LessonGenericComponent implements OnInit {


  public studentPage = false;
  private courseId;
  public hideLecture = true;
  public hideSeminar = true;
  public hideHomework = true;
  public resourceType: string;
  private resourceId: string;
  public lecture = false;
  public seminar = false;
  public homework = false;
  public delete_lesson: boolean;

  modalActions = new EventEmitter<string | MaterializeAction>();


  constructor(private dataService: DataService, private router: Router, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
  }

  @Input() lesson;
  @Input() index;

  ngOnInit() {
    let role = JSON.parse(sessionStorage.getItem('user')).role;
    if (role === 'Student') {
      this.studentPage = true;
    }
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });
    console.log(this.lesson);
    for (let resource of this.lesson.resourcesDtos) {
      if (resource !== null) {
        switch (resource.type) {
          case 'Lecture': {
            this.lecture = true;
            break;
          }
          case 'Seminar': {
            this.seminar = true;
            break;
          }
          case 'Homework': {
            this.homework = true;
            break;
          }
        }
      }
    }
  }

  hideIndicator() {
    let li = document.getElementsByClassName('indicator')[this.index];
    li.setAttribute('style', 'display:none');
  }

  showIndicator() {
    let li = document.getElementsByClassName('indicator')[this.index];
    li.setAttribute('style', 'display:default');
    li.setAttribute('style', 'background-color: #3388cbb5!important');
  }

  hideTab(elem_id) {
    let div = document.getElementById(elem_id);
    div.setAttribute('style', 'display:none');
  }

  deleteResource() {
    this.dataService.deleteData(`http://localhost:63944/Lessons/${this.resourceId}`).subscribe(response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
    for (let resource of this.lesson.resourcesDtos) {
      if (resource !== null && resource.id === this.resourceId) {
        console.log(resource);
        this.lesson.resourcesDtos[this.lesson.resourcesDtos.indexOf(resource)] = null;
        this.hideIndicator();
        switch (resource.type) {
          case 'Lecture': {
            this.lecture = false;
            break;
          }
          case 'Seminar': {
            this.seminar = false;
            break;
          }
          case 'Homework': {
            this.homework = false;
            break;
          }
        }

        console.log(this.lesson);
      }
    }
    this.closeModal();
  }

  openModalResource(resources, resourceType) {
    this.delete_lesson = false;
    console.log(resources);
    this.resourceType = resourceType;
    this.resourceId = resources.filter(r => r !== null).filter(r => r.type.toLowerCase() === resourceType).map(r => r.id)[0];
    console.log(this.resourceId);
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  openModalLesson() {
    this.delete_lesson = true;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  deleteLesson() {
    this.dataService.deleteData(`http://localhost:63944/Weeks/${this.lesson.id}`).subscribe(response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
    document.getElementById(this.lesson.id).remove();
    this.closeModal();
  }

  goToEdit(lesson_id: string) {
    console.log('clicked');
    this.router.navigate([`/edit-lesson/${lesson_id}`]);
  }

  addResource(weekId) {
    if (!(this.lecture && this.seminar && this.homework)) {
      sessionStorage.setItem('weekId', weekId);
      this.router.navigate([`/upload-material/`]);
    }
  }


}

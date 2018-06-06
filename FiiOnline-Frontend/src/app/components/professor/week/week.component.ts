import {Component, EventEmitter, OnInit, Renderer2} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {WeekModel} from '../../../models/weekmodel';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterializeAction} from 'angular2-materialize';


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss', '../../../app.component.scss']
})
export class WeekComponent implements OnInit {

  public professors = new Array();
  public model = new WeekModel();
  public week_number = Array.from({length: 16}, (v, k) => k + 1);
  private courseId: string;
  public onEdit = false;
  private lesson_id: string;
  public modal_header: string;
  public modal_content: string;


  public modalActions = new EventEmitter<string | MaterializeAction>();


  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2) {
  }


  ngOnInit() {
    this.courseId = sessionStorage.getItem('courseId');
    this.dataService.fetchData(`http://localhost:63944/Courses/course-weeks/${this.courseId}`).subscribe(response => {
        console.log(response);
        this.week_number = Array.from({length: 16}, (v, k) => k + 1);
        for (let lesson of response) {
          let li = document.getElementsByTagName('li')[lesson.weekNr + 11];
          console.log(lesson.weekNr + 10);
          this.renderer.setAttribute(li, 'class', 'disabled');
          console.log(li);
        }
      },
      err => {
      })
    ;
    this.route.params.subscribe(params => {
      this.lesson_id = params['id'];
      if (this.lesson_id !== undefined) {
        this.onEdit = true;
        this.dataService.fetchData(`http://localhost:63944/Weeks/${this.lesson_id}`).subscribe(response => {
            console.log(response);
            this.model.title = response.title;
            this.model.description = response.description;
            this.model.date = response.date;
            this.model.courseId = response.courseId;
            this.model.weekNr = response.weekNr;
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }


  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout((router: Router) => {
      this.closeModal();
      this.router.navigate(['professor-courses']);
    }, 2000);
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }


  onSubmit(model: WeekModel) {
    if (!this.onEdit) {
      model.courseId = this.courseId;
      this.dataService.postData('http://localhost:63944/Weeks', model).subscribe(response => {
          this.modal_header = 'Lesson created!';
          this.modal_content = `${model.title} has been created`;
          this.openModal();
        },
        err => {
          this.modal_header = 'Ooops something went wrong!';
          this.modal_content = `${model.title} could not be created. Please try again later`;
          this.openModal();
        }
      );
    }
    else {
      this.dataService.putData(`http://localhost:63944/Weeks/${this.lesson_id}`, this.model).subscribe(response => {
          this.modal_header = 'Lesson updated!';
          this.modal_content = `${model.title} has been updated`;
          this.openModal();
        },
        err => {
          this.modal_header = 'Ooops something went wrong!';
          this.modal_content = `${model.title} could not be updated. Please try again later`;
          this.openModal();
        }
      );
    }
  }

}


import {Component, EventEmitter, OnInit, Renderer2} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {WeekModel} from '../../../models/weekmodel';
import {ActivatedRoute, Router} from '@angular/router';


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

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2) {
  }


  ngOnInit() {
    this.courseId = sessionStorage.getItem('courseId');
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



  onSubmit(model: WeekModel) {

    console.log(model);
    if (!this.onEdit) {
      model.courseId = this.courseId;
      model.date = new Date();
      this.dataService.postData('http://localhost:63944/Weeks', model).subscribe(response => {
        },
        err => {
        }
      );
    }
    else {
      this.dataService.putData(`http://localhost:63944/Weeks/${this.lesson_id}`, this.model).subscribe(response => {
        },
        err => {
        }
      );
    }
  }
}


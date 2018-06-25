import {Component, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {CourseModel} from '../../../models/coursemodel';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterializeAction} from 'angular2-materialize';
import {GlobalVariable} from '../../../config/global';


@Component({
  selector: 'app-edit-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.scss', '../../../app.component.scss']
})

export class EditCourseComponent implements OnInit {
  public professors = new Array();
  public model = new CourseModel();
  public onEdit = true;
  public showTeachersDropdown = false;
  private courseId: string;

  public modalHeader: string;
  public modalText: string;
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Users/professors`).subscribe(response => {
        for (let prof of response) {
          this.professors.push({
            name: `${prof.firstName} ${prof.lastName}`,
            id: prof.id
          });
        }
        this.showTeachersDropdown = true;
      },
      err => {
        console.log(err);
      }
    );
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Courses/${this.courseId}`).subscribe(response => {
          this.model.name = response.name;
          this.model.description = response.description;
          this.model.year = response.year;
          this.model.semester = response.semester;
          this.model.professorsGUIDs = response.profGuids;

        },
        err => {
          console.log(err);
        }
      );
    });

  }

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout((router: Router) => {
      this.closeModal();
      this.router.navigate(['courses']);
    }, 2000);
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  onSubmit(model: CourseModel) {
    this.dataService.putData(`${GlobalVariable.BASE_API_URL}/Courses/${this.courseId}`, model).subscribe(response => {
        this.modalHeader = 'Course edited';
        this.modalText = 'The course has been successfully edited';
        this.openModal();
      },
      err => {
        this.modalHeader = 'Ooops! Something went wrong!';
        this.modalText = 'Unfortunately something went wrong. Please try again later!';
        this.openModal();
      }
    );
  }
}

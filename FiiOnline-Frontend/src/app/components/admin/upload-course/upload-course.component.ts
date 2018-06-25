import {Component, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {CourseModel} from '../../../models/coursemodel';
import {MaterializeAction} from 'angular2-materialize';
import {Router} from '@angular/router';
import {GlobalVariable} from '../../../config/global';

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.scss', '../../../app.component.scss']
})
export class UploadCourseComponent implements OnInit {
  public professors = [];
  public model = new CourseModel();
  public onEdit = false;
  public showTeachersDropdown = false;

  public modalHeader: string;
  public modalText: string;
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private dataService: DataService, private router: Router) {
  }


  ngOnInit() {
    this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Users/professors`).subscribe(response => {
        response.forEach((prof) => {
          this.professors.push({
            name: `${prof.firstName} ${prof.lastName}`,
            id: prof.id
          });
        });

        this.showTeachersDropdown = true;
      },
      err => {
        console.log(err);
      }
    );
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
    this.dataService.postData(`${GlobalVariable.BASE_API_URL}/Courses`, model).subscribe(response => {
        this.modalHeader = 'Course created';
        this.modalText = 'The course has been successfully created';
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

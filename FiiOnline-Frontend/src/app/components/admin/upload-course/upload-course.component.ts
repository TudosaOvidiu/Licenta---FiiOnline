import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {CourseModel} from '../../../models/coursemodel';

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

  constructor(private dataService: DataService) {
  }


  ngOnInit() {
    this.dataService.fetchData('http://localhost:63944/Users/professors').subscribe(response => {
        response.forEach((prof) => {
          this.professors.push({
            name: `${prof.firstName} ${prof.lastName}`,
            id: prof.id
          });
        });

        this.showTeachersDropdown = true;
        console.log(this.professors);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(model: CourseModel) {
    this.dataService.postData('http://localhost:63944/Courses', model).subscribe(response => {
      },
      err => {
      }
    );
  }
}

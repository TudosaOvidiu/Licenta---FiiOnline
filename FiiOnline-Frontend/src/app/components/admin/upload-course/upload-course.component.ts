import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {CourseModel} from '../../../models/coursemodel';

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.scss', '../../../app.component.scss']
})
export class UploadCourseComponent implements OnInit {
  public professors = new Array();
  public model = new CourseModel();
  public onEdit = false;

  constructor(private dataService: DataService) {
  }


  ngOnInit() {
    this.dataService.fetchData('http://localhost:63944/Users/professors').subscribe(response => {
        for (let prof of response) {
          this.professors.push({
            name: `${prof.firstName} ${prof.lastName}`,
            id: prof.id
          });
        }
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

import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {CourseModel} from '../../../models/coursemodel';


@Component({
  selector: 'app-edit-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.scss', '../../../app.component.scss']
})

export class EditCourseComponent implements OnInit {
  public professors = new Array();
  public model = new CourseModel();

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
    this.dataService.fetchData('http://localhost:63944/Courses/02a69dc4-64fe-4cbc-85a4-6f207207a9fb').subscribe(response => {
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
  }

  onSubmit(model: CourseModel) {
    this.dataService.postData('http://localhost:63944/Courses', model).subscribe(response => {
      },
      err => {
      }
    );
  }
}

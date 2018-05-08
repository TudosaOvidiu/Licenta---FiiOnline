import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {CourseModel} from '../../../models/coursemodel';
import {ActivatedRoute, Router} from '@angular/router';


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

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.dataService.fetchData('http://localhost:63944/Users/professors').subscribe(response => {
        for (let prof of response) {
          this.professors.push({
            name: `${prof.firstName} ${prof.lastName}`,
            id: prof.id
          });
        }
        this.showTeachersDropdown = true;
        console.log(this.professors);
      },
      err => {
        console.log(err);
      }
    );
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.dataService.fetchData(`http://localhost:63944/Courses/${this.courseId}`).subscribe(response => {
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

  onSubmit(model: CourseModel) {
    this.dataService.putData(`http://localhost:63944/Courses/${this.courseId}`, model).subscribe(response => {
      },
      err => {
      }
    );
  }
}

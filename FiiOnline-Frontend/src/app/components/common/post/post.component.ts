import {Component, EventEmitter, OnInit} from '@angular/core';
import {PostModel} from '../../../models/postmodel';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterializeAction} from 'angular2-materialize';
import {Location} from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss', '../../../app.component.scss']
})
export class PostComponent implements OnInit {

  public model = new PostModel();
  private user;
  public adminPage = true;
  public courses = [];
  public showCoursesDropdown = false;
  private onEdit = false;
  private postId: string;

  public modal_header: string;
  public modal_content: string;

  public modalActions = new EventEmitter<string | MaterializeAction>();

  public toolbar = [
    ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
    ['fontName', 'fontSize', 'color'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
    ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
    ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
    ['link', 'unlink'],
    ['code']
  ];

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.router.url.includes('edit')) {
      this.onEdit = true;
    }
    if (this.user.role === 'Professor') {
      this.adminPage = false;
      this.dataService.fetchData(`http://localhost:63944/Courses/professor-courses/${this.user.id}`).subscribe(response => {
          console.log(response);
          response.forEach((course) => {
            this.courses.push({
              title: course.name,
              id: course.id
            });
          });

          this.showCoursesDropdown = true;
          console.log(this.courses);
        },
        err => {
          console.log(err);
        }
      );
    }

    if (this.onEdit) {
      this.route.params.subscribe(params => {
        this.postId = params['id'];
        this.dataService.fetchData(`http://localhost:63944/Posts/${this.postId}`).subscribe(response => {
            console.log(response);
            this.model.title = response.title;
            this.model.courseGuid = response.courseGuid;
            this.model.description = response.description;
          },
          err => {
            console.log(err);
          }
        );
      });

    }
  }

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout((router: Router) => {
      this.closeModal();
      this.location.back();
    }, 2000);
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  onSubmit() {
    if (!this.onEdit) {
      if (!this.adminPage) {
        let course_name = this.courses.filter(c => c.id === this.model.courseGuid)[0].title;
        this.model.authorGuid = this.user.id;
        this.model.title = `${course_name}: ${this.model.title}`;
      } else {
        this.model.title = `Administrative: ${this.model.title}`;
      }
      this.dataService.postData('http://localhost:63944/Posts', this.model).subscribe(response => {
          this.modal_header = 'Post created!';
          this.modal_content = 'The post has been created successfully!';
          this.openModal();
        },
        err => {
          this.modal_header = 'Oops!';
          this.modal_content = 'Something went wrong! Please try again later!';
          this.openModal();
        }
      );
    } else {
      this.dataService.putData(`http://localhost:63944/Posts/${this.postId}`, this.model).subscribe(response => {
          this.modal_header = 'Post updated!';
          this.modal_content = 'The post has been updated successfully!';
          this.openModal();
        },
        err => {
          this.modal_header = 'Oops!';
          this.modal_content = 'Something went wrong! Please try again later!';
          this.openModal();
        });
    }
  }

}

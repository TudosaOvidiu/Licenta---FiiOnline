import {Component, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import {MaterializeAction} from 'angular2-materialize';
import {GlobalVariable} from '../../../config/global';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss', '../../../app.component.scss']
})
export class PostsListComponent implements OnInit {

  public posts = new BehaviorSubject([]);
  private offset = 0;
  private limit = 10;
  private user;
  public professorPage = false;
  public adminPage = false;
  public studentPage = false;
  public selectedPost: string;

  public modalActions = new EventEmitter<string | MaterializeAction>();


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user.role === 'Professor') {
      this.professorPage = true;
    } else if (this.user.role === 'Administrator') {
      this.adminPage = true;
    } else {
      this.studentPage = true;
    }
    this.getPosts(this.offset, this.limit, this.user.id);
  }

  onScroll() {
    this.offset += this.limit;
    this.getPosts(this.offset, this.limit, this.user.id);
  }

  getPosts(offset: number, limit: number, userId: string) {
    let url: string;
    if (this.professorPage) {
      url = `${GlobalVariable.BASE_API_URL}/Posts/professor-posts?offset=${offset}&limit=${limit}&id=${userId}`;
    } else if (this.studentPage) {
      url = `${GlobalVariable.BASE_API_URL}/Posts/student-posts?offset=${offset}&limit=${limit}&studentId=${userId}`;
    } else {
      url = `${GlobalVariable.BASE_API_URL}/Posts/admin-posts?offset=${offset}&limit=${limit}`;
    }
    this.dataService.fetchData(url)
      .subscribe(response => {
          const currentPosts = this.posts.getValue();
          this.posts.next(_.concat(currentPosts, response));

        },
        err => {
          console.log(err);
        }
      );
  }

  openModal(postId: string) {
    this.selectedPost = postId;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  deletePost() {
    let posts = this.posts.getValue();
    posts = posts.filter(p => p.id !== this.selectedPost);
    this.posts.next(posts);

    this.dataService.deleteData(`${GlobalVariable.BASE_API_URL}/Posts/${this.selectedPost}`).subscribe(response => {
      },
      err => {
        console.log(err);
      });

    this.closeModal();
  }

}

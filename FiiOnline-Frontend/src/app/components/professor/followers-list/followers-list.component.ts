import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataService} from '../../../services/data.service';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.scss', '../../../app.component.scss']
})
export class FollowersListComponent implements OnInit {

  public followers = new BehaviorSubject([]);
  private offset = 0;
  private limit = 20;
  private courseId: string;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.getFollowers(this.offset, this.limit, this.courseId);
    });
  }

  onScroll() {
    this.offset += this.limit;
    this.getFollowers(this.offset, this.limit, this.courseId);
  }

  getFollowers(offset: number, limit: number, courseId: string) {
    this.dataService.fetchData(`http://localhost:63944/Courses/course-follwers?offset=${offset}&limit=${limit}&id=${courseId}`)
      .subscribe(response => {
          console.log(response);
          const currentFollowers = this.followers.getValue();
          this.followers.next(_.concat(currentFollowers, response));

          console.log(this.followers);
        },
        err => {
          console.log(err);
        }
      );
  }

}

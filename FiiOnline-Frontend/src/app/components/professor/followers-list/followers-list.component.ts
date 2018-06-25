import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataService} from '../../../services/data.service';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {GlobalVariable} from '../../../config/global';

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
    this.dataService.fetchData(`${GlobalVariable.BASE_API_URL}/Courses/course-follwers?offset=${offset}&limit=${limit}&id=${courseId}`)
      .subscribe(response => {
          const currentFollowers = this.followers.getValue();
          this.followers.next(_.concat(currentFollowers, response));

        },
        err => {
          console.log(err);
        }
      );
  }

}

import {Component, OnInit, Renderer2} from '@angular/core';
import {Credentials} from '../../../models/credentials';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';
import * as vivus from 'vivus';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../app.component.scss']
})
export class LoginComponent implements OnInit {
  public model = new Credentials();
  error = false;
  label_up = true;

  public svg_height;
  public svg_y_point;

  constructor(private authService: AuthenticationService, private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {

    const animation = new vivus('my-svg', {
      type: 'scenario',
      // duration: 2000,
      animTimingFunction: vivus.EASE_OUT
    });

    let width = document.getElementsByTagName('input')[0].clientWidth;
    this.renderer.setAttribute(document.getElementById('fii-img'), 'width', `${width.toString()}px!important`);

    let x = document.getElementById('building').clientHeight;
    console.log(x);
    this.svg_height = -7.31304267 * Math.pow(10, -3) * Math.pow(x, 2) + 9.566873937 * x - 2089.755761;
    this.svg_y_point = 3.946548001 * Math.pow(10, -3) * Math.pow(x, 2) - 5.070685004 * x + 1645.199674;
    let svg = document.getElementsByTagName('svg')[0];


  }


  onResize(event) {
    let width = document.getElementsByTagName('input')[0].clientWidth;
    this.renderer.setAttribute(document.getElementById('fii-img'), 'width', `${width.toString()}px!important`);

  }

  onSubmit(loginModel: Credentials) {
    this.authService.login(loginModel).subscribe(response => {
        console.log(response);
        this.error = false;
        switch (response.role) {
          case 'Student':
            this.router.navigate(['news']);
            break;
          case 'Professor':
            this.router.navigate(['professor-courses']);
            break;
          case 'Administrator':
            this.router.navigate(['courses']);
            break;
        }
      },
      err => {
        this.error = true;
      }
    );
  }

}

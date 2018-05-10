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

  constructor(private authService: AuthenticationService, private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {
    // const x = new vivus('my-svg', {
    //   duration: 200,
    //   animTimingFunction: vivus.EASE_OUT_BOUNCE
    // });
    //
    // const y = new vivus('my-svg2', {
    //   duration: 200,
    //   animTimingFunction: vivus.EASE_OUT_BOUNCE
    // });
    let width = document.getElementsByTagName('input')[0].clientWidth;
    this.renderer.setAttribute(document.getElementById('fii-img'), 'width', `${width.toString()}px!important`);
    // let height = width - (width * 0.3);
    // this.renderer.setAttribute(document.getElementById('fii-img'), 'height', `${height.toString()}px!important`);
  }

  onResize(event){
    let width = document.getElementsByTagName('input')[0].clientWidth;
    this.renderer.setAttribute(document.getElementById('fii-img'), 'width', `${width.toString()}px!important`);
    // let height = width - width * 3.0;
    // this.renderer.setAttribute(document.getElementById('fii-img'), 'height', `${height.toString()}px!important`);
  }

  onSubmit(loginModel: Credentials) {
    this.authService.login(loginModel).subscribe(response => {
        console.log(response);
        this.error = false;
        switch (response.role) {
          case 'Student':
            this.router.navigate(['']);
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

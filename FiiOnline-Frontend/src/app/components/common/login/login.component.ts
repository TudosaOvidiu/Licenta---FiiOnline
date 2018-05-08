import {Component, OnInit, Renderer2} from '@angular/core';
import {Credentials} from '../../../models/credentials';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';

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
  }

  onSubmit(loginModel: Credentials) {
    this.authService.login(loginModel).subscribe(response => {
        console.log(response);
        this.error = false;
        switch (response.role) {
          case 'Student':
            this.router.navigate(['courses']);
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

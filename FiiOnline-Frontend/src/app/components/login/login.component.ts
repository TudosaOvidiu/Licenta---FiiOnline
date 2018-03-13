import { Component, OnInit } from '@angular/core';
import {Credentials} from '../../models/credentials';
import {AuthenticationService} from '../../services/authentication.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.scss']
})
export class LoginComponent implements OnInit {
  model = new Credentials(null, null);
  error: boolean = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

  }

  onSubmit(loginModel: Credentials) {
    console.log(loginModel);
    this.authService.login(loginModel).subscribe(response => {
      console.log(response);
      },
      err => {
        this.error = true;
      }
    );
  }

}

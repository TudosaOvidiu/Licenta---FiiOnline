import { Component, OnInit } from '@angular/core';
import {Credentials} from '../../../models/credentials';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../app.component.scss']
})
export class LoginComponent implements OnInit {
  public model = new Credentials();
  error = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

  }

  onSubmit(loginModel: Credentials) {
    console.log(loginModel);
    this.authService.login(loginModel).subscribe(response => {
      console.log(response);
      this.error = false;
      },
      err => {
        console.log("sunt in err");
        this.error = true;
      }
    );
  }

}

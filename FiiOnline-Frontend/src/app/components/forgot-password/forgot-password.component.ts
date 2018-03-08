import { Component, OnInit } from '@angular/core';
import {Credentials} from '../../models/credentials';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./../login/login.component.scss', './forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dataService: DataService) { }
  model = new Credentials(null, null);
  ngOnInit() {
  }
  onSubmit(forgotPassModel: Credentials) {
    this.dataService.postData('http://localhost:63944/Account/forgotpassword', {
      email: forgotPassModel.email,
      password: 'somePass'
    }).subscribe(response => {
        //console.log(response);
      },
      err => {
        //console.log(err);
        //console.log('erroare ');
      }
    );
}

}

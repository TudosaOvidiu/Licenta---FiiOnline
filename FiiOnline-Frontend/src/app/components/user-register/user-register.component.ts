import {Component, Inject, OnInit} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {of} from 'rxjs/observable/of';
import {ChangePassword} from '../../models/changePassword';
import {UserModel} from '../../models/UserModel';
import * as $ from 'jquery/dist/jquery.min.js';
import {AuthenticationService} from '../../services/authentication.services';
import {DataService} from '../../services/data.service';

declare var jquery: any;

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss', '../../app.component.scss']
})
export class UserRegisterComponent implements OnInit {
  passwordsMatch = true;
  model: UserModel = new UserModel();
  years = ['1', '2', '3'];
  someProperty = true;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    // $(document).ready(function () {
    //   $('select').material_select();
    // });
  }

  comparePasswords(model: UserModel) {
    if (model.password !== '' && model.confirmPassword !== '') {
      if (model.password === model.confirmPassword) {
        this.passwordsMatch = true;
        return;
      }
      this.passwordsMatch = false;
      return;
    }
    this.passwordsMatch = true;
    return;
  }

  onSubmit(model: UserModel) {
    model.role = 'Student';
    console.log(model);
    this.dataService.postData('http://localhost:63944/Account/register', model).subscribe(response => {
        //console.log(response);
      },
      err => {
        //console.log(err);
        //console.log('erroare ');
      }
    );
  }


}

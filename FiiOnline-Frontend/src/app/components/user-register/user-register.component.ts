import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {of} from 'rxjs/observable/of';
import {ChangePassword} from '../../models/changepassword';
import {UserModel} from '../../models/usermodel';
import * as $ from 'jquery/dist/jquery.min.js';
import {AuthenticationService} from '../../services/authentication.service';
import {DataService} from '../../services/data.service';
import {MaterializeAction} from 'angular2-materialize';
import {Router} from '@angular/router';
import {subscriptionLogsToBeFn} from 'rxjs/testing/TestScheduler';

declare var jquery: any;

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss', '../../app.component.scss']
})
export class UserRegisterComponent implements OnInit {
  passwordsMatch = true;
  public model: UserModel = new UserModel();
  public modalHeader: string;
  public modalText: string;

  constructor(private dataService: DataService, private router: Router) {
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
        this.modalHeader = 'Registration succeeded';
        this.modalText = 'Your account was created. Please check your email to confirm your account!';
        this.openModal();
      },
      err => {
        this.modalHeader = 'Registration failed';
        this.modalText = 'Something went wrong! Please try again!';
        this.openModal();
      }
    );
  }

  modalActions = new EventEmitter<string | MaterializeAction>();

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout((router: Router) => {
          this.closeModal();
          this.router.navigate(['login']);
        }, 2500);
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }


}

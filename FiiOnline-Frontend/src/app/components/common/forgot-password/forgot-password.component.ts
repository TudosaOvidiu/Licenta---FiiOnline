import {Component, EventEmitter, OnInit} from '@angular/core';
import {Credentials} from '../../../models/credentials';
import {DataService} from '../../../services/data.service';
import {MaterializeAction} from 'angular2-materialize';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login/login.component.scss', './forgot-password.component.scss', '../../../app.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }
  public model = new Credentials();
  modalActions = new EventEmitter<string | MaterializeAction>();

  ngOnInit() {
  }
  onSubmit(forgotPassModel: Credentials) {
    this.dataService.postData('http://localhost:63944/Account/forgotpassword', {
      email: forgotPassModel.email,
      password: 'somePass'
    }).subscribe(response => {
        this.router.navigate(['login']);
      },
      err => {
        this.openModal();
      }
    );
}


  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout((router: Router) => {
      this.closeModal();
      this.router.navigate(['login']);
    }, 3000);
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

}

import {Component, EventEmitter, OnInit, Renderer2} from '@angular/core';
import {Credentials} from '../../../models/credentials';
import {DataService} from '../../../services/data.service';
import {MaterializeAction} from 'angular2-materialize';
import {Router} from '@angular/router';
import {GlobalVariable} from '../../../config/global';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../../app.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router,  private renderer: Renderer2) { }
  public model = new Credentials();
  modalActions = new EventEmitter<string | MaterializeAction>();

  ngOnInit() {
  }
  onSubmit(forgotPassModel: Credentials) {
    this.dataService.postData(`${GlobalVariable.BASE_API_URL}/Account/forgotpassword`, {
      email: forgotPassModel.email,
      password: 'somePass'
    }).subscribe(response => {
        this.router.navigate(['/']);
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
      this.router.navigate(['/']);
    }, 3000);
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

}

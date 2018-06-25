import {Component, EventEmitter, OnInit} from '@angular/core';
import {AppRoutingModule} from '../../../routing/app-routing.module';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {ChangePassword} from '../../../models/changepassword';
import {MaterializeAction} from 'angular2-materialize';
import {GlobalVariable} from '../../../config/global';

// import {Server} from 'http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.scss', './reset-password.component.scss', '../../../app.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private sub: any;
  public model = new ChangePassword();
  public passwordsMatch = true;
  public modalHeader: string;
  public modalText: string;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
  }

  comparePasswords(model: ChangePassword) {
    if (model.password != null && model.confirmPassword != null) {
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

  onSubmit(model: ChangePassword) {

    this.sub = this.route.queryParams.subscribe(params => {
      this.dataService.postData(`${GlobalVariable.BASE_API_URL}/Account/ResetPassword?userId=` + encodeURIComponent(`${params.userId}`) + '&code=' + encodeURIComponent(`${params.code}`),
        {
          Email: 'someEmail',
          Password: model.password
        }).subscribe(response => {
          this.modalHeader = 'Reset password succeeded';
          this.modalText = 'Your password was changed successfully. You can now log into your account.';
          this.openModal();
        },
        err => {
          this.modalHeader = 'Reset password failed';
          this.modalText = 'Something went wrong! Please try again later';
          this.openModal();
        }
      );
    });
  }

  modalActions = new EventEmitter<string | MaterializeAction>();

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



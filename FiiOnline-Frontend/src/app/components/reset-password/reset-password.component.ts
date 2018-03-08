import {Component, OnInit} from '@angular/core';
import {AppRoutingModule} from '../../routing/app-routing.module';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {ChangePassword} from '../../models/changePassword';

// import {Server} from 'http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./../login/login.component.scss', './reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  id: string;
  private sub: any;
  model = new ChangePassword(null, null);
  passwordsMatch = true;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
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
    console.log(model);

    this.sub = this.route.queryParams.subscribe(params => {
      console.log(params);
      this.dataService.postData(`http://localhost:63944/Account/ResetPassword?userId=` + encodeURIComponent(`${params.userId}`) + '&code=' + encodeURIComponent(`${params.code}`),
        {
          Email: 'someEmail',
          Password: model.password
        }).subscribe(response => {
          //console.log(response);
        },
        err => {
          //console.log(err);
          //console.log('erroare ');
        }
      );
      // console.log(`http://localhost:63944/Account/ResetPassword?userId=` + encodeURIComponent(`${params.userId}`) + '&code=' + encodeURIComponent(`${params.code}`);
    });
  }
}



import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalVariable} from '../../../config/global';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss', '../../../app.component.scss']
})
export class AccountConfirmationComponent implements OnInit {

  public titleMessage: string;
  public panelMessage: string;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dataService.getData(`${GlobalVariable.BASE_API_URL}/Account/ConfirmAccount?userId=${encodeURIComponent(`${params.userId}`)}&code=${encodeURIComponent(`${params.code}`)}`)
        .subscribe(response => {
            this.titleMessage = 'Account has been created';
            this.panelMessage = 'Your account was successfully created. You can now log into your account.';
          },
          err => {
            this.titleMessage = 'Something went wrong';
            this.panelMessage = 'Something went wrong! Please try again later!';
            console.log(err.toString());
          }
        );
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}


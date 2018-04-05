import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss', '../../../app.component.scss']
})
export class AccountConfirmationComponent implements OnInit {

  public panelMessage: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dataService.fetchData(`http://localhost:63944/Account/ConfirmAccount?userId=` + encodeURIComponent(`${params.userId}`) + '&code=' + encodeURIComponent(`${params.code}`))
      .subscribe(response => {
          console.log(response);
          this.panelMessage = "Your account was successfully created. You can now log into your account.";
          console.log("intra aici");
        },
        err => {
          this.panelMessage = "Something went wrong! Please try again later!";
          console.log("intra in errir");
          console.log(err.toString());
        }
      );
    });
  }
}


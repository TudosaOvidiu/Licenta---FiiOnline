import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public role: string;
  public user;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.role = this.user.role;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}

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
  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.role = JSON.parse(sessionStorage.getItem('user')).role;
    console.log(this.role);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login']);
  }

}

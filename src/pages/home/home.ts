import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from '../../services/login.service';
import {LoginInfos} from '../../Entity/loginInfos';
import {User} from '../../Entity/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  connectedUser : User;

  loginInfos: LoginInfos = {
    username : 'admin',
    password : 'admin'
  };

  constructor(public navCtrl: NavController, private loginService: LoginService) {
    this.login();
  }

  login() : void {
    this.loginService.login(this.loginInfos).subscribe(user => this.connectedUser = user);
  }
}

import { Component } from '@angular/core';
import {AlertController} from 'ionic-angular';
import {LoginInfos} from "../../entities/loginInfos";
import {LoginService} from "../../services/login.service";
import {User} from "../../entities/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  loginInfos : LoginInfos = {
    username: "",
    password: ""
  }
  user: User;

  constructor(public alertCtrl: AlertController, private loginService: LoginService) {
    localStorage.clear();
  }

  login() {
    this.loginService.login(this.loginInfos)
      .subscribe((user) => {
        this.user = user;
    }, (err) => {
      console.error(err);
      let alert = this.alertCtrl.create({
            title: 'Authentification failed!',
            subTitle: 'Wrong username or password!',
            buttons: ['OK']
          });
          alert.present();
    });
  }
}

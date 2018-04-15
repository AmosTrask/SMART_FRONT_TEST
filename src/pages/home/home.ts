import { Component } from '@angular/core';
import {AlertController} from 'ionic-angular';
import {LoginInfos} from "../../entities/loginInfos";
import {LoginService} from "../../services/login.service";
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  loginInfos : LoginInfos = {
    username: "",
    password: ""
  };

  user: User = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  logged = false;

  constructor(public alertCtrl: AlertController, private loginService: LoginService, private userService: UserService,
              private authService: AuthService)
  { }

  ionViewDidLoad () {
    this.logged = this.authService.isLogged();
  }

  login() {
    this.loginService.login(this.loginInfos)
      .subscribe(() => {
          this.getUser();
          this.logged = this.authService.isLogged();
        },
        (err) => {
      console.error(err);
      let alert = this.alertCtrl.create({
            title: 'Authentification failed!',
            subTitle: 'Wrong username or password!',
            buttons: ['OK']
          });
          alert.present();
    });
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.user = user; },
        (err) => {
          console.error(err);
          let alert = this.alertCtrl.create({
            title: 'Request failed!',
            subTitle: 'You must be authenticated',
            buttons: ['OK']
          });
          alert.present();
        });
  }
}

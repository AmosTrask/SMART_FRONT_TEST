import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  user: User = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
              public alertCtrl: AlertController) { }

  ionViewDidLoad() { }

  register(){
    this.userService.addUser(this.user).subscribe((user) => {
      this.user = user;
    },
      (err) =>{
        console.error(err);
        let alert = this.alertCtrl.create({
          title: 'Registration failed!',
          subTitle: err.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }

}

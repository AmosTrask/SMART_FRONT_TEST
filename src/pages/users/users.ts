import { Component } from '@angular/core';
import {AlertController, } from 'ionic-angular';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users: User [];

  connectedUser: User;

    constructor(public alertCtrl: AlertController, private userService: UserService) {
     this.getAllUsers();
     this.getUser();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users );
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.connectedUser = user },
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

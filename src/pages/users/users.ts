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

  constructor(public alertCtrl: AlertController, private userService: UserService) {
     this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users );
  }
}

import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { User } from '../../Entity/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users: User [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private userService: UserService) {
    this.getAllUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }
}

import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';


/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.getUserService();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  getUsers(){
    return this.http.get('http://localhost:8080/user/all');
  }


  getUserService(): void {
    this.getUsers().subscribe(data => console.log(data));
  }

}

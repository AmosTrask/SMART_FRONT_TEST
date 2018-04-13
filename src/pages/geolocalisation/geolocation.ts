import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {LoginInfos} from "../../Entity/loginInfos";
import {User} from "../../Entity/user";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html'
})
export class GeolocationPage {
  lat: any;
  lng: any;

  loginInfos: LoginInfos = {
    username : 'admin',
    password : 'admin'
  };

  connectedUser: User;


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private loginService: LoginService) {

  }

  ionViewDidLoad(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.login();
  }


  login() : void {
    this.loginService.login(this.loginInfos).subscribe(user => this.connectedUser = user);
  }
}

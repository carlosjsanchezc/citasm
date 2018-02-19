import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {
  event = { nombre: '', password:'',user:'' };

  fecha=new Date().toISOString();
  nombre:string;
  user:string;
  password:string;
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) 
  {

    
  }
  
  log_in() {
    this.event.user=this.user;
    this.event.password=this.password;
    

    this.viewCtrl.dismiss(this.event);
  }

  closeModal() {
    this.event.user='';
    this.event.password='';
    this.viewCtrl.dismiss();
  }
  cancel() {
    this.event.user='';
    this.event.password='';
    this.viewCtrl.dismiss();
  }
}
 
  
  
 
  

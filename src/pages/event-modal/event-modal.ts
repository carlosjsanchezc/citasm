import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController } from 'ionic-angular';


/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  event = { nombre: '', cedula:'',fecha:'',telefono:'',patologia:'',opcion:'agregarcita' };
  valida:boolean=false;
  fecha=new Date().toISOString();
  nombre:string;
  cedula:string;
  telefono:string;
  patologia:string;
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public AlertController:AlertController) 
  {
    let preselectedDate = this.navParams.get('selectedDay');
console.log('Asignando Fecha:');
this.nombre='';
this.cedula='';
this.telefono='';
this.patologia='';
console.log(this.fecha);
    this.fecha=preselectedDate;
    console.log(this.fecha);
    
  }
  
  save() {
    this.event.fecha=this.fecha.substr(0,10);
    this.event.cedula=this.cedula;
    this.event.nombre=this.nombre;
    this.event.telefono=this.telefono;
    this.event.patologia=this.patologia;
    this.event.opcion='agregarcita';

    this.viewCtrl.dismiss(this.event);
  }
validacampos(){
  this.valida=true;
  if (this.nombre.length<2){
    this.valida=false;
  }
  if (this.telefono.length<2){
    this.valida=false;
  }
  
}
  closeModal() {
    this.viewCtrl.dismiss();
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
}
 
  
  
 
  

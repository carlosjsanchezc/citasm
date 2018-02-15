import { NavController,ModalController, AlertController,LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { EventModalPage } from '../event-modal/event-modal';
import { LoginModalPage } from '../login-modal/login-modal';

import { HttpService } from '../../providers/http-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {eventSource = [];
  viewTitle: string;
  registros:any[] = [];
  selectedDay : string;
  theday:string;
  themonth:string;
  islogin:boolean;
  numerocitas:number;
  nombre:string;
  users:any[]=[];
  calendar = {
    mode: 'month',
    currentDate: new Date()}

  constructor(public navCtrl: NavController,private modalCtrl: ModalController, public HttpService:HttpService, public alertCtrl:AlertController,public loadingCtrl:LoadingController) 
  { 
    this.viewTitle='Prueba Modal';
    this.nombre='';
  }

  

  onDaySelect(event) {
 
    let theday=parseInt(event.date);
    if (event.date<10)
    {
      theday='0'+parseInt(event.date);
      
    }

    let themonth=parseInt(event.month+1);
    if (event.month<10)
    {
      themonth='0'+themonth;
    }
 
    console.log('Buscando Data');
    this.selectedDay=parseInt(event.year)+'-'+themonth+'-'+theday+'T00:00:00.183Z';
    let eldia=parseInt(event.year)+'-'+themonth+'-'+theday;
    this.HttpService.getDia(eldia).subscribe((data) => 
    {
    
    console.log(data['results']);
    console.log(data['results'].length);
    this.numerocitas=data['results'].length;
    this.registros=data['results'];
  },
    (error) =>{
    console.error(error);
    });
  }  

  addEvent() {
   
    let myModal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay});
    myModal.present();

    myModal.onDidDismiss(data => {
      console.log('Saliendo');
      console.log(data);
      let loader = this.loadingCtrl.create({
        content: "Procesando Datos...",
        duration: 3000
      });
      loader.present();
      if (data) {
        this.HttpService.agregarCita(data).subscribe((data) => 
        {
            console.log('Llego');
          let alert = this.alertCtrl.create({
            title: 'Registro de Citas',
            subTitle: 'Su cita se ha programado correctamente',
            buttons: ['Ok']
          });
          alert.present();
          let eldia=data.fecha;
          console.log('Refreshing');
          console.log(eldia);
          this.HttpService.getDia(eldia).subscribe((data) => 
          {
          
          console.log(data['results']);
            this.registros=data['results'];
        },
          (error) =>{
          console.error(error);
          });
        },
        (error) =>{
        console.error(error);
        });


        let eventData = data;
        console.log(eventData)
        
      }
    });
  }

  milogin() {
   
    let myModal = this.modalCtrl.create(LoginModalPage, {selectedDay: this.selectedDay});
    myModal.present();

    myModal.onDidDismiss(data => {
      console.log('Validando Login');
      console.log(data);
       if (data) {
        let loader = this.loadingCtrl.create({
          content: "Validando Login...",
          duration: 3000
        });

        loader.present();
        this.HttpService.login(data.user,data.password).subscribe((data2) => 
        {
          console.log('Data2:');
          console.log(data2);
          this.users=data2['results'];
          console.log('Users;');
          console.log(this.users);
          console.log('Nombre:');
          this.nombre=this.users[0].nombre;
          console.log(this.nombre);
        }
        ,
        (error) =>{
        console.error(error);
        });


        let eventData = data;
        console.log(eventData)
        
      }
    });
  }
  

}

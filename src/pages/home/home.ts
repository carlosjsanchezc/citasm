import { NavController,ModalController, AlertController,LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { EventModalPage } from '../event-modal/event-modal';
import { LoginModalPage } from '../login-modal/login-modal';
import * as moment from 'moment';
import 'moment/locale/es';
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
  spin:boolean;
  slidingItem:any;
  config:any;
  proximacita:Date;
  proxCitaStr:string;
  calendar = {
    mode: 'month',
    currentDate: new Date()}

  constructor(public navCtrl: NavController,private modalCtrl: ModalController, public HttpService:HttpService, public alertCtrl:AlertController,public loadingCtrl:LoadingController) 
  { 
    moment.locale('es');
    console.log('Momento:',moment.locale());
    this.viewTitle='Prueba Modal';
    this.nombre='';
      
  this.HttpService.getConfig().subscribe((data) => 
  {
    console.log("Config:",data);
    this.HttpService.maximo=data['maximo'];
    this.HttpService.periodo=data['periodo'];
    this.HttpService.empieza=data['empieza'];
  },(error) =>{
    console.error(error);
    });
  }

  

  onDaySelect(event) {
    let year=parseInt(event.year);
    let theday=parseInt(event.date);
    this.theday=parseInt(event.date).toString();
    if (theday<10)
    {
      this.theday='0'+parseInt(event.date).toString();
      
    }

    let themonth=parseInt(event.month+1);
    this.themonth=themonth.toString();
    if (themonth<10)
    {
      this.themonth='0'+themonth;
    }
    this.selectedDay=parseInt(event.year)+'-'+this.themonth+'-'+this.theday+'T00:00:00.183Z';
     let eldia=parseInt(event.year)+'-'+this.themonth+'-'+this.theday;
    this.spin=true;
    this.HttpService.getDia(eldia).subscribe((data) => 
    {
    this.spin=false;
    this.numerocitas=data['results'].length;
    this.registros=data['results'];
    console.log(event.year);
    console.log(event.month);
    console.log(event.date);
    
    this.proximacita=new Date(event.year,event.month,event.date,this.HttpService.empieza,0,0);
    console.log("Proxima Cita:",this.proximacita);
    this.proximacita.setMinutes(this.proximacita.getMinutes()+30*this.numerocitas);
    this.proxCitaStr=this.proximacita.toLocaleTimeString();
    if (this.numerocitas>=this.HttpService.maximo)
    {
      this.proxCitaStr="No hay mas cupos para este día";
    }  

    console.log("Sumado 30:",this.proxCitaStr);
  },
    (error) =>{
    console.error(error);
    });
  }  

  verdia() {
 
    
    //this.selectedDay=parseInt(event.year)+'-'+this.themonth+'-'+this.theday+'T00:00:00.183Z';
    let year=this.selectedDay.substr(0,4);
    let themonth=this.selectedDay.substr(5,2);
    let theday=this.selectedDay.substr(8,2);
    let eldia=year+'-'+themonth+'-'+theday;
    this.proximacita=new Date(parseInt(year),parseInt(themonth),parseInt(theday),this.HttpService.empieza,0,0);
    console.log("Proxima Citax:",this.proximacita);
    //this.proximacita.setDate(this.proximacita.getMinutes()+30/48);
    console.log("Sumado 30X");
    //console.log("Sumado 30",this.proximacita);
    this.HttpService.getDia(eldia).subscribe((data) => 
    {
    
    this.numerocitas=data['results'].length;
    this.registros=data['results'];
  },
    (error) =>{
    console.error(error);
    });
  }  
visto(id,slidingItem,j){
  console.log('Cambiando Atendido');
 console.log('j:',j);
  slidingItem.close();
  console.log('Registros:',this.registros);
  console.log('Antes:',this.registros[j].atendido);
  /*
  if (this.registros[j].atendido==0) 
  {

    console.log('era 0');
    this.registros[j].atendido=1;
    console.log('Despues de 0:',this.registros[j].atendido);
  }
  else
  {
    console.log('era 1');

    this.registros[j].atendido=0;
  }
   */
  console.log('Despues:',this.registros[j].atendido);
  
  this.HttpService.cambiavisto(id).subscribe((data) => 
        {
        },(error) =>{
          console.error(error);
          });
          this.verdia();
}
  addEvent() {
   
    let myModal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay});
    myModal.present();

    myModal.onDidDismiss(data => {
      console.log('Saliendo');
    

      if (data) {
        let loader = this.loadingCtrl.create({
          content: "Procesando Datos...",
          duration: 1000
        });
        loader.present();
        this.HttpService.agregarCita(data).subscribe((data2) => 
        {
            console.log('Llego');
          let alert = this.alertCtrl.create({
            title: 'Registro de Citas',
            subTitle: 'Su cita se ha programado correctamente',
            buttons: ['Ok']
          });
          alert.present();
          let eldia=data['fecha'];
          console.log('Fecha:',eldia);
          console.log('Refreshing');
          console.log(eldia);
          this.HttpService.getDia(eldia).subscribe((data3) => 
          {
          
          console.log(data3['results']);
            this.registros=data3['results'];
        },
          (error) =>{
          console.error(error);
          });
        },
        (error) =>{
        console.error(error);
        });

        this.verdia();
        let eventData = data;
        console.log(eventData)
        
      }
    });
    this.verdia();
  }

  milogin() {
   
    let myModal = this.modalCtrl.create(LoginModalPage, {selectedDay: this.selectedDay});
    myModal.present();

    myModal.onDidDismiss(data => {
      console.log('Validando Login');
      console.log(data);
       if (data) {
       

     
        this.HttpService.login(data.user,data.password).subscribe((data2) => 
        {
          if (data2['exito']==true){
            let loader = this.loadingCtrl.create({
              content: "Validando Login...",
              duration: 3000
            });
            loader.present();
            console.log('Data2:');
            console.log(data2);
            this.users=data2['results'];
            console.log('Users;');
            console.log(this.users);
            console.log('Nombre:');
            this.nombre=this.users['nombre'];
            console.log(this.nombre);
  
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Login',
              subTitle: 'Nombre de usuario o clave incorrecta',
              buttons: ['Ok']
            });
            alert.present();

          }

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

import { NavController, ModalController, AlertController, LoadingController, DateTime } from 'ionic-angular';
import { Component } from '@angular/core';
import { EventModalPage } from '../event-modal/event-modal';
import { LoginModalPage } from '../login-modal/login-modal';
import * as moment from 'moment';
import 'moment/locale/es';
import { HttpService } from '../../providers/http-service';
import { createNgModuleFactory } from '@angular/core/src/view';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eventSource = [];
  viewTitle: string;
  registros: any[] = [];
  selectedDay: string;
  theday: string;
  themonth: string;
  islogin: boolean;
  theyear: string;
  numerocitas: number;
  nombre: string;
  users: any[] = [];
  spin: boolean;
  slidingItem: any;
  config: any;
  proximacita: Date;
  proxCitaStr: string;
  cita = { nombre: "", cedula: "", telefono: "", patologia: "", fecha: "",hora:"" };

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };


  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public HttpService: HttpService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    moment.locale('es');
    console.log('Momento:', moment.locale());
    this.viewTitle = 'Prueba Modal';
    this.nombre = '';
    this.cita.nombre = "";
    this.cita.cedula = "";
    this.cita.telefono = "";
    this.cita.patologia = "";
    this.cita.fecha = "";
    let fecha=new Date();
    let year=fecha.getFullYear();
    let month=fecha.getMonth();
    let day=fecha.getDate();
    this.onDaySelect({year:year,month:month,date:day});
    this.HttpService.getConfig().subscribe((data) => {
      console.log("Config:", data);
      this.HttpService.maximo = data['maximo'];
      this.HttpService.periodo = data['periodo'];
      this.HttpService.empieza = data['empieza'];
    }, (error) => {
      console.error(error);
    });
  }

  addEvent() {
    this.llenaFormulario();

  }
  llenaFormulario() {
    const prompt = this.alertCtrl.create({
      title: 'Citas',
      message: "Introduzca la información para crear la cita",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre del paciente'
        },
        {
          name: 'cedula',
          placeholder: 'Cédula del paciente'
        },
        {
          name: 'telefono',
          placeholder: 'Teléfono'
        },
        {
          name: 'patologia',
          placeholder: 'Patología'
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');

          }
        },
        {
          text: 'Guardar',
          handler: data => {
            let n = data.nombre;
            this.cita.nombre = data.nombre;
            this.cita.cedula = data.cedula;
            this.cita.patologia = data.patologia;
            this.cita.telefono = data.telefono;
            this.cita.fecha = this.selectedDay;
            this.cita.hora=this.proxCitaStr;
            this.addEvent2(this.cita);
            this.verdia();
            
            //this.onDaySelect({ year: this.theyear, month: this.themonth, date: this.theday });
          }
        }
      ]
    });
    prompt.present();
  }


  onDaySelect(event) {
    //console.log(event);
console.log(event);
    let year = parseInt(event.year);
    let theday = parseInt(event.date);
    this.theday = parseInt(event.date).toString();
    this.theyear = year.toString();
    if (theday < 10) {
      this.theday = '0' + parseInt(event.date).toString();

    }

    let themonth = parseInt(event.month + 1);
    this.themonth = themonth.toString();
    if (themonth < 10) {
      this.themonth = '0' + themonth;
    }
    this.selectedDay = parseInt(event.year) + '-' + this.themonth + '-' + this.theday + 'T00:00:00.183Z';
    let eldia = parseInt(event.year) + '-' + this.themonth + '-' + this.theday;
    this.spin = true;
    this.HttpService.getDia(eldia).subscribe((data) => {
      this.spin = false;
      this.numerocitas = data['results'].length;
      this.registros = data['results'];
      this.proximacita = new Date(event.year, event.month, event.date, this.HttpService.empieza, 0, 0);
      this.proximacita.setMinutes(this.proximacita.getMinutes() + 30 * this.numerocitas);
      this.proxCitaStr = this.proximacita.toLocaleTimeString();
      if (this.numerocitas >= this.HttpService.maximo) {
        this.proxCitaStr = "No hay mas cupos para este día";
      }
    },
      (error) => {
        console.error(error);
      });
  }

  verdia() {
    let year = this.selectedDay.substr(0, 4);
    let themonth = this.selectedDay.substr(5, 2);
    let theday = this.selectedDay.substr(8, 2);
    let eldia = year + '-' + themonth + '-' + theday;

    this.HttpService.getDia(eldia).subscribe((data) => {
      this.numerocitas = data['results'].length;
      this.registros = data['results'];
      this.proximacita = new Date(parseInt(year), parseInt(themonth), parseInt(theday), this.HttpService.empieza, 0, 0);
      this.proximacita.setMinutes(this.proximacita.getMinutes() + 30 * this.numerocitas);
      this.proxCitaStr = this.proximacita.toLocaleTimeString();
    },
      (error) => {
        console.error(error);
      });
  }

  verdia2() {
    let year = this.selectedDay.substr(0, 4);
    let themonth = this.selectedDay.substr(5, 2);
    let theday = this.selectedDay.substr(8, 2);
    let eldia = year + '-' + themonth + '-' + theday;

    this.HttpService.getDia(eldia).subscribe((data) => {
      this.numerocitas = data['results'].length;
      this.registros = data['results'];
      this.proximacita = new Date(parseInt(year), parseInt(themonth), parseInt(theday), this.HttpService.empieza, 0, 0);
      this.proximacita.setMinutes(this.proximacita.getMinutes() + 30 * this.numerocitas);
      this.proxCitaStr = this.proximacita.toLocaleTimeString();
    },
      (error) => {
        console.error(error);
      });
  }

  visto(id, slidingItem, j) {
    slidingItem.close();
    this.HttpService.cambiavisto(id).subscribe((data) => {
    }, (error) => {
      console.error(error);
    });
    this.verdia();
  }
  addEvent2(data) {




    if (data) {
      let loader = this.loadingCtrl.create({
        content: "Procesando Datos...",
        duration: 1000
      });
      loader.present();
      this.HttpService.agregarCita(data).subscribe((data2) => {
        console.log('Llego');
        let alert = this.alertCtrl.create({
          title: 'Registro de Citas',
          subTitle: 'Su cita se ha programado correctamente',
          buttons: ['Ok']
        });
        alert.present();
        let eldia = data['fecha'];
        this.HttpService.getDia(eldia).subscribe((data3) => {
          this.registros = data3['results'];
        },
          (error) => {
            console.error(error);
          });
      },
        (error) => {
          console.error(error);
        });

      this.verdia();
      let eventData = data;
      console.log(eventData)

    }

    this.verdia();
  }
  eliminar(id){
    this.HttpService.eliminar(id).subscribe((data2) => {
 
        this.verdia();
      },
        (error) => {
          console.error(error);
        });
  }
  milogin() {
    let myModal = this.modalCtrl.create(LoginModalPage, { selectedDay: this.selectedDay });
    myModal.present();
    myModal.onDidDismiss(data => {
      if (data) {
        this.HttpService.login(data.user, data.password).subscribe((data2) => {
          if (data2['exito'] == true) {
            let loader = this.loadingCtrl.create({
              content: "Validando Login...",
              duration: 3000
            });
            loader.present();
            this.users = data2['results'];
            this.nombre = this.users['nombre'];
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
          (error) => {
            console.error(error);
          });


        let eventData = data;
        console.log(eventData)

      }
    });
  }


}

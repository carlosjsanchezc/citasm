import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  urlbase:string;
  constructor( 
  
    private http: HttpClient
  ) {

    this.urlbase="https://lycexpress.com/appcitas/appcitas.php";
  }


 getDia(dia) {
   console.log('Dia que llega:');
   console.log(dia);
    return this.http.get(this.urlbase+"?opcion=verdia&fecha="+dia);
  }
  login(user,password) {
    return this.http.get(this.urlbase+'?opcion=login&user='+user+'&password='+password);
  }
  agregarCita(cita) {
    return this.http.get(this.urlbase+'?opcion=agregarcita&fecha='+cita.fecha+'&nombre='+cita.nombre+'&telefono='+cita.telefono+'&patologia='+cita.patologia+'&cedula='+cita.cedula);
  }
  cambiavisto(id) {
    return this.http.get(this.urlbase+'?opcion=cambiavisto&id='+id);
  }
   


}

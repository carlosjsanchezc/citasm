import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  urlbase:string;
  maximo:number;
  periodo:number;
  empieza:number;
  datos:any[];
  constructor( 
  
    private http: HttpClient
  ) {

    this.urlbase="http://midasbottraders.com/appcitas/appcitas.php";
   

  }

getConfig()
{
  return this.http.get(this.urlbase+"?opcion=config");
}
 getDia(dia) {

    return this.http.get(this.urlbase+"?opcion=verdia&dr=cono&fecha="+dia);
  }
  login(user,password) {

    return this.http.get(this.urlbase+'?opcion=login&dr=cono&user='+user+'&password='+password);
  }
  agregarCita(cita) {
    return this.http.get(this.urlbase+'?opcion=agregarcita&dr=cono&fecha='+cita.fecha+'&nombre='+cita.nombre+'&telefono='+cita.telefono+'&patologia='+cita.patologia+'&cedula='+cita.cedula+'&hora='+cita.hora);
  }
  cambiavisto(id) {
    return this.http.get(this.urlbase+'?opcion=cambiavisto&dr=cono&id='+id);
  }
   
  eliminar(id) {
    return this.http.get(this.urlbase+'?opcion=eliminar&dr=cono&id='+id);
  }

}

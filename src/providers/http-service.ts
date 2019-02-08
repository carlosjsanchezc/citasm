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

    return this.http.get(this.urlbase+"?opcion=verdia&dr=jlld&fecha="+dia);
  }
  login(user,password) {

    return this.http.get(this.urlbase+'?opcion=login&dr=jlld&user='+user+'&password='+password);
  }
  agregarCita(cita) {
    return this.http.get(this.urlbase+'?opcion=agregarcita&dr=jlld&fecha='+cita.fecha+'&nombre='+cita.nombre+'&telefono='+cita.telefono+'&patologia='+cita.patologia+'&cedula='+cita.cedula);
  }
  cambiavisto(id) {
    return this.http.get(this.urlbase+'?opcion=cambiavisto&dr=jlld&id='+id);
  }
   


}

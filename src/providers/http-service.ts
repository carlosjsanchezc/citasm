import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient
  ) {}

 getDia(dia) {
    return this.http.get('https://dc2.com.ve/appcitas/verdia.php?dia='+dia);
  }
  login(user,password) {
    return this.http.get('https://dc2.com.ve/appcitas/login.php?user='+user+'&password='+password);
  }
  agregarCita(cita) {
    return this.http.post('https://dc2.com.ve/appcitas/agregacita.php',JSON.stringify(cita), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  cambiavisto(id) {
    return this.http.get('https://dc2.com.ve/appcitas/cambiavisto.php?id='+id);
  }
   


}

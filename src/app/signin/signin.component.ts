import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  usuario : any = {rol:true};
  loading : boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  crear(){
    let formulario        :any = document.getElementById("crear");
    let formularioValido  :boolean = formulario.reportValidity();
    
    if(formularioValido){
      this.loading = true;
      this.crearService()
          .subscribe( data => this
          .confirmar(data))
    }
  }
  
  confirmar(resultado: any){
    this.loading = false;
    if(resultado){
      //si no es nulo
      alert("Usuario creado exitosamente.");
      this.usuario = {rol:true};
      location.href="/";
    }
    else {
      //si  es nulo
      alert("Error al crear usuario.");
    }
  }

  crearService(){
    var httpOption = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/api/rol/guardar", this.usuario, httpOption);
  }
  regresar(){
    location.href = "/";
  }
}

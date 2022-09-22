import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorInicio: boolean = false;
  loading    : boolean = false;
  usuario    : any = {rol:true};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // crear(){

  // }
  login(){
    let formulario       :any = document.getElementById('login');
    let formularioValido :boolean = formulario.reportValidity();
    
    if(formularioValido){
      this.loading = true;
      this.loginService().subscribe( data => this.inicarSesion(data))
    }
  }

  inicarSesion(resultado:any) {
    this.loading = false;
    if(resultado){
      //si no es nulo
      localStorage.setItem("usuario",JSON.stringify(resultado));
      if(resultado.rol == false){
       location.href = "/admin"; 
      }else {
        location.href = "/distribuidor";
      }
      
    }
    else {
      //si  es nulo
      this.errorInicio = true;
    }
  }

  loginService (){
    var httpOption = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/api/rol/login", this.usuario, httpOption);
  }

  crearCuenta(){
    location.href="/signin";
  }
}

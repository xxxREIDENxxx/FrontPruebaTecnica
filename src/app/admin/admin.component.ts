import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


import { Pedido } from '../entity/Pedido';
import { User } from '../entity/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usuario : any = {};

  user:User[]=[];

  pedido:any ={};

  pedidos   : Pedido [] = [];
  loading   : boolean = false;
  crear: boolean = false;
 
//prueba input
  opcionSeleccionado1: string = "";
  opcionSeleccionado2: string = "";
  opcionSeleccionado3: boolean = false;
  opcionSeleccionado4: string = "";
  verUsuario      : string = '';
  verFecha        : string = '';
  verEstado       : boolean = false;
  verCiudad       : string = '';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario")!);
    if(!this.usuario){
      location.href = "/";
    }else{
      if(this.usuario.rol != false){
        location.href = "/";
      }
      this.pedido = {lugar:this.pedido.lugar, fecha:this.pedido.fecha,estado:this.pedido.estado,user:this.user}
      this.buscarPedidos();
      this.buscarUsuarios();
    }
    
  }

  logout(){
    localStorage.removeItem("usuario");
    location.href = "/"
  }

  buscarPedidos(){
    this.loading = true;
    this.buscarPedidoServicio().subscribe(
    (response:Pedido[])=>{
      this.pedidos = response;
      this.loading = false;
      console.log(response);
    });

  }

  buscarPedidoServicio() :Observable<any> {
    return this.http.get<Pedido[]>("http://localhost:8080/api/pedido/buscar").pipe(
      catchError(e => "error"));
  }


  agregar(){
    this.crear = !this.crear;
    //this.crearPedido();
  }
  
  crearPedido(form:any){
    let formularioValido :boolean = true;

    this.verUsuario = this.opcionSeleccionado1;
    this.verFecha   = this.opcionSeleccionado2;
    this.verEstado  = this.opcionSeleccionado3;
    this.verCiudad  = this.opcionSeleccionado4;

    this.buscarUsuarios();
    console.log("valido");
    console.log(form);
    console.log(this.verUsuario);
    console.log(this.verFecha);
    console.log(this.verEstado);
    console.log(this.verCiudad);

    

    if(formularioValido){
     this.loading = true;
     this.PedidoServicio().subscribe(
      data => this.finalizarActualizarPedido(data)
     );
    }
  }
  PedidoServicio(){
    
    var httpOption = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    console.log(this.pedido);
    return this.http.post<Pedido[]>("http://localhost:8080/api/pedido/guardar", this.pedido, httpOption);
    
  }

  finalizarActualizarPedido(pedido: any){
    
    if(pedido){
      alert("Pedido Actualizado exitosamente.");
    }
    this.pedido = { lugar:this.pedido.lugar, fecha:this.pedido.fecha,estado:this.pedido.estado,user:this.user}  
    this.crear = false;
    this.buscarPedidos();
  }



  buscarUsuarios(){
    this.loading = true;
    this.buscarUsuarioServicio().subscribe(
    (response:User[])=>{
      this.user = response;
    });

  }

  buscarUsuarioServicio() :Observable<any> {
    return this.http.get<User[]>("http://localhost:8080/api/rol").pipe(
      catchError(e => "error"));
  }
  
}

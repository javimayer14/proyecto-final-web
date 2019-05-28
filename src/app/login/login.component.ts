import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import swal from 'sweetalert2'
import {  AuthService } from '../services/usuarios/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor Sing In !";
  usuario:Usuario;
  constructor(private authService:AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    if(this.authService.isAuthenticated){
      this.router.navigate(['/login']);
      swal.fire('Error Login','Ya estas logueado',"info");
      
    }
  }

  logIn():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Login','Username o Password vacio',"error");
      return;
    }
    this.authService.login(this.usuario).subscribe(response  => {

      console.log(response);
      this.router.navigate(['/inicio']);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      swal.fire('Login', 'Hola ${usuario.username}, has iniciado sesion con exito !' , "success");
    }, err =>{
      if(err.status == 400){
        swal.fire('Error Login','Username o Password incorrecto',"error");
      }
    });
  }
}

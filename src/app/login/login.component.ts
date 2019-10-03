import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import swal from 'sweetalert2'
import { AuthService } from '../services/usuarios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor Sing In !";
  usuario: Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    // if(this.authService.isAuthenticated){
    //   this.router.navigate(['/inicio']);
    //   swal.fire('Error Login','Ya estas logueado',"info");

    //}
  }

  logIn(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o Password vacio', "error");
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

      if (usuario.roles.indexOf('ROLE_ADMIN') == -1) {
        this.authService.logOut();
        this.router.navigate(['/login']);
        swal.fire('Error Login', 'No es un usuario administrador', "error");


      } else {
        swal.fire('Login', 'Bienvenido, ¡has iniciado sesión con éxito!', "success");
        this.router.navigate(['/inicio']);
      }


    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Username o Password incorrecto', "error");
      }
      else if (err) {
        swal.fire('Error Login', 'Error al intentar conectarse', "error");
      }
    });
  }
}

import { Component } from '@angular/core';
import { AuthService } from './services/usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProyectoFinalPaginaWeb';


constructor(private authService:AuthService,private router:Router){    

  }
  logOut():void{
    this.authService.logOut();
    swal.fire('LogOut','Has cerrado sesion con exito !',"success" );
    this.router.navigate(['/login']);


  }
}
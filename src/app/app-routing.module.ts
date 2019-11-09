import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../app/inicio/inicio.component';
import { GeneracionUsuarioComponent } from '../app/generacion-usuario/generacion-usuario.component';
import { RelevamientoInicialComponent } from './relevamiento-inicial/relevamiento-inicial.component';
import { GenerarExelComponent } from './generar-exel/generar-exel.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { HistorialComponent } from './historial/historial.component';
import { ContactoComponent } from './contacto/contacto.component';
const routes: Routes = [
  {
  path: 'inicio',
  component: InicioComponent, canActivate:[AuthGuard]
  },
  {
    path: 'generacionUsuario',
    component: GeneracionUsuarioComponent , canActivate:[AuthGuard]
  },
  {
    path: 'relevamientoInicial',
    component: RelevamientoInicialComponent , canActivate:[AuthGuard]
  },
  {
    path: 'exelPrueba',
    component: GenerarExelComponent, canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent, canActivate:[AuthGuard]
  },
  {
    path: 'historial',
    component: HistorialComponent, canActivate:[AuthGuard]
  },
  {
    path: 'contacto',
    component: ContactoComponent, canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

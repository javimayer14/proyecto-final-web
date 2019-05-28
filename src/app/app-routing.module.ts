import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../app/inicio/inicio.component';
import { GeneracionUsuarioComponent } from '../app/generacion-usuario/generacion-usuario.component';
import { RelevamientoInicialComponent } from './relevamiento-inicial/relevamiento-inicial.component';
import { GenerarExelComponent } from './generar-exel/generar-exel.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
  path: 'inicio',
  component: InicioComponent
  },
  {
    path: 'generacionUsuario',
    component: GeneracionUsuarioComponent
  },
  {
    path: 'relevamientoInicial',
    component: RelevamientoInicialComponent
  },
  {
    path: 'exelPrueba',
    component: GenerarExelComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

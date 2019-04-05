import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../app/inicio/inicio.component';
import { GeneracionUsuarioComponent } from '../app/generacion-usuario/generacion-usuario.component';
import { RelevamientoInicialComponent } from './relevamiento-inicial/relevamiento-inicial.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

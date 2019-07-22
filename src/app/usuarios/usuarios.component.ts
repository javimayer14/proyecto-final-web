import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../services/usuarios/auth.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public datosBusqueda:{} = {};
  data: any = [];
  usuarioObtenido:any = null;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public router: Router, private http:HttpClient, private authService:AuthService) { }
  
  public traerUsuarios(){
    
    return this.http.get('http://localhost:8080/api/usuarios', {headers: this.agregarAutorizacionHeader()}).subscribe(
  
      data  => {
      this.datosBusqueda = data;
      this.data =data;
      
      
      console.log("PUT Request is successful ", this.datosBusqueda);
      
      });

   }
   public traerUsuarioPorId(id){
    console.log(id);
    
    let params = new HttpParams().set("id",id) //Create new HttpParams
    console.log("ESTOS SON LOS PARAMETROS " + params);
    return this.http.get(`${'http://localhost:8080/api/usuarios'}/${id}`,{headers: this.agregarAutorizacionHeader()}).subscribe(
  
      data  => {
      this.usuarioObtenido = data;
        
      });;
   }
  public  eliminarUsuario(id){
    console.log(id);
    
    let params = new HttpParams().set("id",id) //Create new HttpParams
    console.log("ESTOS SON LOS PARAMETROS " + params);
    return this.http.delete(`${'http://localhost:8080/api/usuarios'}/${id}`,{headers: this.agregarAutorizacionHeader(),params: params}).subscribe(
  
      data  => {
     
      swal.fire('Usuarios','el usuario fue eliminado con exito',"success" );
      
      console.log("Delete Request is successful ");
      this.traerUsuarios();
      
      });;
    
  }
   private agregarAutorizacionHeader(){
    let token = this.authService.token;
    if(token != null){
        return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
}

  ngOnInit() {
  }

}

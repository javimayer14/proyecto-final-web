import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManejoErroresService {

  constructor(private HttpClient, private router:Router,private service: AuthService) { }

  public isNoAutorizado(e):boolean{

    if(e.status==401 || e.status==403){
      if(this.service.isAuthenticated()){
        this.service.logOut();

      }
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
}

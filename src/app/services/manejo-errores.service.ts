import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManejoErroresService {

  constructor(private HttpClient, private router:Router) { }

  public isNoAutorizado(e):boolean{

    if(e.status==401 || e.status==403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
}

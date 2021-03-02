import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServerUrlService {
  serverUrl: string;
  usuarioObtenido: any = null;

  constructor() {
    this.serverUrl = "http://localhost:8080";
  }
}

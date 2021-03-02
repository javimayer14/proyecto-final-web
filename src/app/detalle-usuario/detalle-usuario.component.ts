import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ServerUrlService } from "../services/server-url.service";

@Component({
  selector: "app-detalle-usuario",
  templateUrl: "./detalle-usuario.component.html",
  styleUrls: ["./detalle-usuario.component.css"],
})
export class DetalleUsuarioComponent implements OnInit {
  usuarioObtenido: any = null;
  constructor(public router: Router, private service: ServerUrlService) {
    this.usuarioObtenido = this.service.usuarioObtenido
    console.log("LL", this.usuarioObtenido);
  }

  ngOnInit() {

  }
}

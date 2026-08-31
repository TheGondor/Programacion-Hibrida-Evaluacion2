import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { CitaComponent } from '../componentes/cita/cita.component';
import { Cita } from '../types/cita';
import { Citas } from '../servicios/citas';
import { Configuracion } from '../servicios/configuracion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    NgIf,
    RouterLink,
    CitaComponent,
  ],
})
export class HomePage implements OnInit {
  cita: Cita | undefined;
  permitirBorrar = false;

  constructor(
    private citas: Citas,
    private configuracion: Configuracion,
    private router: Router
  ) {
    this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationEnd && evento.urlAfterRedirects.includes('home')) {
        this.cargarVista();
      }
    });
  }

  ngOnInit() {
    this.cargarVista();
  }

  onEliminar(cita: Cita): void {
    this.citas.eliminar(cita.id);
    this.cita = this.citas.obtenerAleatoria();
  }

  private cargarVista(): void {
    this.permitirBorrar = this.configuracion.obtenerPermitirBorrarInicio();
    this.cita = this.citas.obtenerAleatoria();
  }
}

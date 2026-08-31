import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  ViewDidEnter,
  ViewWillEnter,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
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
export class HomePage implements OnInit, OnDestroy, ViewWillEnter, ViewDidEnter {
  cita: Cita | undefined;
  permitirBorrar = false;
  private navegacion: Subscription | undefined;

  constructor(
    private citas: Citas,
    private configuracion: Configuracion,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarVista();
    void this.citas.iniciarPlugin();
    void this.cargarConfiguracion();
    this.navegacion = this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationEnd && this.esInicio(evento.urlAfterRedirects)) {
        this.cargarVista();
      }
    });
  }

  ngOnDestroy() {
    this.navegacion?.unsubscribe();
  }

  ionViewWillEnter() {
    this.cargarVista();
  }

  ionViewDidEnter() {
    this.cargarVista();
  }

  async onEliminar(cita: Cita): Promise<void> {
    await this.citas.eliminar(cita.id);
    this.cargarVista();
  }

  private esInicio(url: string): boolean {
    return url === '/home' || url === '/' || url.startsWith('/home?');
  }

  private cargarVista(): void {
    this.permitirBorrar = this.configuracion.obtenerPermitirBorrarInicio();
    this.cita = this.citas.obtenerAleatoria();
  }

  private async cargarConfiguracion(): Promise<void> {
    await this.configuracion.inicializar();
    this.cargarVista();
  }
}

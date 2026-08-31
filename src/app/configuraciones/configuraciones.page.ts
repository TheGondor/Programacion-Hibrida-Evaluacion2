import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ViewWillEnter,
} from '@ionic/angular';
import { PermitirBorrarComponent } from '../componentes/permitir-borrar/permitir-borrar.component';
import { Configuracion } from '../servicios/configuracion';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    CommonModule,
    FormsModule,
    PermitirBorrarComponent,
  ],
})
export class ConfiguracionesPage implements OnInit, ViewWillEnter {
  permitirBorrarInicio = true;

  constructor(private configuracion: Configuracion) { }

  ngOnInit() {
    this.permitirBorrarInicio = this.configuracion.obtenerPermitirBorrarInicio();
  }

  ionViewWillEnter() {
    this.permitirBorrarInicio = this.configuracion.obtenerPermitirBorrarInicio();
  }

  onCambioOpcion(activo: boolean): void {
    this.permitirBorrarInicio = activo;
    this.configuracion.establecerPermitirBorrarInicio(activo);
  }
}

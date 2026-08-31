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
import { FormularioCitaComponent } from '../componentes/formulario-cita/formulario-cita.component';
import { ListaCitasComponent } from '../componentes/lista-citas/lista-citas.component';
import { Cita } from '../types/cita';
import { Citas } from '../servicios/citas';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    CommonModule,
    FormsModule,
    FormularioCitaComponent,
    ListaCitasComponent,
  ],
})
export class GestionPage implements OnInit, ViewWillEnter {
  citas: Cita[] = [];

  constructor(private citasServicio: Citas) { }

  ngOnInit() {
    this.cargarCitas();
  }

  ionViewWillEnter() {
    this.cargarCitas();
  }

  onAgregar(cita: Cita): void {
    this.citasServicio.agregar(cita.frase, cita.autor);
    this.cargarCitas();
  }

  onEliminar(cita: Cita): void {
    this.citasServicio.eliminar(cita.id);
    this.cargarCitas();
  }

  private cargarCitas(): void {
    this.citas = this.citasServicio.obtenerTodas();
  }
}

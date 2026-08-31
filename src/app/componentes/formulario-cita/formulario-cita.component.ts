import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem, IonNote } from '@ionic/angular';
import { Cita } from '../../types/cita';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.scss'],
  imports: [NgIf, FormsModule, IonItem, IonInput, IonButton, IonNote],
})
export class FormularioCitaComponent implements OnInit {
  @Output() agregar = new EventEmitter<Cita>();

  frase = '';
  autor = '';

  constructor() { }

  ngOnInit() {}

  onAgregar(): void {
    if (this.frase.trim().length < 5 || this.autor.trim().length < 2) {
      return;
    }

    this.agregar.emit({
      id: 0,
      frase: this.frase.trim(),
      autor: this.autor.trim(),
    });

    this.frase = '';
    this.autor = '';
  }
}

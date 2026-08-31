import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem } from '@ionic/angular';
import { Cita } from '../../types/cita';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.scss'],
  imports: [FormsModule, IonItem, IonInput, IonButton],
})
export class FormularioCitaComponent implements OnInit {
  @Output() agregar = new EventEmitter<Cita>();

  frase = '';
  autor = '';

  constructor() { }

  ngOnInit() {}

  get formularioValido(): boolean {
    return this.frase.trim().length > 0 && this.autor.trim().length > 0;
  }

  onAgregar(): void {
    if (!this.formularioValido) {
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

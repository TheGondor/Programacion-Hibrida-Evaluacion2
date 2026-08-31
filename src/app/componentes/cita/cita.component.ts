import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular';
import { Cita, VarianteCita } from '../../types/cita';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
  imports: [IonButton, IonIcon],
})
export class CitaComponent implements OnInit {
  @Input() cita!: Cita;
  @Input() mostrarEliminar = false;
  @Input() variante: VarianteCita = 'tarjeta';
  @Output() eliminar = new EventEmitter<Cita>();

  constructor() { }

  ngOnInit() {}

  onEliminar(): void {
    if (!this.mostrarEliminar) {
      return;
    }
    this.eliminar.emit(this.cita);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonItem, IonLabel, IonToggle } from '@ionic/angular';

@Component({
  selector: 'app-permitir-borrar',
  templateUrl: './permitir-borrar.component.html',
  styleUrls: ['./permitir-borrar.component.scss'],
  imports: [FormsModule, IonItem, IonLabel, IonToggle],
})
export class PermitirBorrarComponent implements OnInit {
  @Input() activo = false;
  @Output() cambio = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  onCambio(checked: boolean): void {
    this.cambio.emit(checked);
  }
}

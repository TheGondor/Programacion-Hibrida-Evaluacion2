import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CitaComponent } from '../cita/cita.component';
import { Cita } from '../../types/cita';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss'],
  imports: [NgFor, NgIf, CitaComponent],
})
export class ListaCitasComponent implements OnInit {
  @Input() citas: Cita[] = [];
  @Output() eliminar = new EventEmitter<Cita>();

  constructor() { }

  ngOnInit() {}

  onEliminar(cita: Cita): void {
    this.eliminar.emit(cita);
  }
}

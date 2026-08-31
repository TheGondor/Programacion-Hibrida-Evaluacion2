import { Service } from '@angular/core';
import { Cita } from '../types/cita';
import { CitasMemoria } from './persistencia/citas-memoria';

@Service()
export class Citas {
  private persistencia = new CitasMemoria();

  obtenerTodas(): Cita[] {
    return this.persistencia.obtenerTodas();
  }

  obtenerAleatoria(): Cita | undefined {
    const citas = this.obtenerTodas();
    if (citas.length === 0) {
      return undefined;
    }

    const indice = Math.floor(Math.random() * citas.length);
    return citas[indice];
  }

  agregar(frase: string, autor: string): void {
    this.persistencia.agregar(frase, autor);
  }

  eliminar(id: number): void {
    this.persistencia.eliminar(id);
  }
}

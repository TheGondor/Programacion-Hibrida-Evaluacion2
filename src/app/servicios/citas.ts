import { Service } from '@angular/core';
import { Cita } from '../types/cita';
import { PersistenciaCitas } from '../types/persistencia';
import { CitasSqlite } from './persistencia/citas-sqlite';

@Service()
export class Citas {
  private persistencia: PersistenciaCitas = new CitasSqlite();
  private citas: Cita[] = [
    {
      id: 1,
      frase: 'El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.',
      autor: 'Ralph Waldo Emerson',
    },
    {
      id: 2,
      frase: 'Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.',
      autor: 'Thomas Edison',
    },
    {
      id: 3,
      frase: 'Ningún viento es bueno para el barco que no sabe adónde va.',
      autor: 'Séneca',
    },
  ];

  async iniciarPlugin(): Promise<void> {
    await this.persistencia.iniciarPlugin();
    const persistidas = await this.persistencia.obtenerTodas();
    if (persistidas.length > 0) {
      this.citas = persistidas;
    }
  }

  async cerrarConexion(): Promise<void> {
    await this.persistencia.cerrarConexion();
  }

  async obtenerTodas(): Promise<Cita[]> {
    return this.citas;
  }

  obtenerAleatoria(): Cita | undefined {
    if (this.citas.length === 0) {
      return undefined;
    }

    const indice = Math.floor(Math.random() * this.citas.length);
    return this.citas[indice];
  }

  async agregar(frase: string, autor: string): Promise<void> {
    const id = this.citas.reduce((max, cita) => Math.max(max, cita.id), 0) + 1;
    this.citas = [...this.citas, { id, frase, autor }];
    await this.persistencia.agregar(frase, autor);
    const persistidas = await this.persistencia.obtenerTodas();
    if (persistidas.length > 0) {
      this.citas = persistidas;
    }
  }

  async eliminar(id: number): Promise<void> {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    await this.persistencia.eliminar(id);
    const persistidas = await this.persistencia.obtenerTodas();
    if (persistidas.length > 0) {
      this.citas = persistidas;
    }
  }

  obtenerCitas(): Cita[] {
    return this.citas;
  }
}

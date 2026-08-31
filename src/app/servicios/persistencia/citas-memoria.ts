import { Cita } from '../../types/cita';
import { PersistenciaCitas } from '../../types/persistencia';

export class CitasMemoria implements PersistenciaCitas {
  private siguienteId = 4;
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
    return;
  }

  async cerrarConexion(): Promise<void> {
    return;
  }

  async obtenerTodas(): Promise<Cita[]> {
    return this.citas;
  }

  async agregar(frase: string, autor: string): Promise<void> {
    this.citas.push({
      id: this.siguienteId,
      frase,
      autor,
    });
    this.siguienteId++;
  }

  async eliminar(id: number): Promise<void> {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }
}

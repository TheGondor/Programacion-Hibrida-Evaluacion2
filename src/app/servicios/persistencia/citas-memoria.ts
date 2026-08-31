import { Cita } from '../../types/cita';

export class CitasMemoria {
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

  obtenerTodas(): Cita[] {
    return this.citas;
  }

  agregar(frase: string, autor: string): void {
    this.citas.push({
      id: this.siguienteId,
      frase,
      autor,
    });
    this.siguienteId++;
  }

  eliminar(id: number): void {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }
}

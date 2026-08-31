import { Service } from '@angular/core';
import { ConfiguracionMemoria } from './persistencia/configuracion-memoria';

@Service()
export class Configuracion {
  private persistencia = new ConfiguracionMemoria();

  obtenerPermitirBorrarInicio(): boolean {
    return this.persistencia.obtener().permitirBorrarInicio;
  }

  establecerPermitirBorrarInicio(valor: boolean): void {
    this.persistencia.guardar({
      permitirBorrarInicio: valor,
    });
  }
}

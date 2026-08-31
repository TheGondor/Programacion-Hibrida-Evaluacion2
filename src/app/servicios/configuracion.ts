import { Service } from '@angular/core';
import { PersistenciaConfiguracion } from '../types/persistencia';
import { ConfiguracionPreferences } from './persistencia/configuracion-preferences';

@Service()
export class Configuracion {
  private persistencia: PersistenciaConfiguracion = new ConfiguracionPreferences();
  private permitirBorrarInicio = true;
  private iniciado = false;

  async inicializar(): Promise<void> {
    if (this.iniciado) {
      return;
    }
    await this.persistencia.inicializar();
    if (this.iniciado) {
      return;
    }
    const datos = await this.persistencia.obtener();
    if (this.iniciado) {
      return;
    }
    this.permitirBorrarInicio = datos.permitirBorrarInicio;
    this.iniciado = true;
  }

  obtenerPermitirBorrarInicio(): boolean {
    return this.permitirBorrarInicio;
  }

  async establecerPermitirBorrarInicio(valor: boolean): Promise<void> {
    this.permitirBorrarInicio = valor;
    this.iniciado = true;
    await this.persistencia.guardar({
      permitirBorrarInicio: valor,
    });
  }
}

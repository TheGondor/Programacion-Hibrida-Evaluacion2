import { ConfiguracionApp } from '../../types/configuracion';
import { PersistenciaConfiguracion } from '../../types/persistencia';

export class ConfiguracionMemoria implements PersistenciaConfiguracion {
  private datos: ConfiguracionApp = {
    permitirBorrarInicio: true,
  };

  async inicializar(): Promise<void> {
    return;
  }

  async obtener(): Promise<ConfiguracionApp> {
    return this.datos;
  }

  async guardar(datos: ConfiguracionApp): Promise<void> {
    this.datos = datos;
  }
}

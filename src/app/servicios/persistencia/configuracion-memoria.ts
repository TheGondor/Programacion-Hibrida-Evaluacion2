import { ConfiguracionApp } from '../../types/configuracion';

export class ConfiguracionMemoria {
  private datos: ConfiguracionApp = {
    permitirBorrarInicio: true,
  };

  obtener(): ConfiguracionApp {
    return this.datos;
  }

  guardar(datos: ConfiguracionApp): void {
    this.datos = datos;
  }
}

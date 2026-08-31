import { Preferences } from '@capacitor/preferences';
import { ConfiguracionApp } from '../../types/configuracion';
import { PersistenciaConfiguracion } from '../../types/persistencia';

const CLAVE = 'permitirBorrarInicio';

export class ConfiguracionPreferences implements PersistenciaConfiguracion {
  async inicializar(): Promise<void> {
    const { value } = await Preferences.get({ key: CLAVE });
    if (value === null) {
      await this.guardar({ permitirBorrarInicio: true });
    }
  }

  async obtener(): Promise<ConfiguracionApp> {
    const { value } = await Preferences.get({ key: CLAVE });
    return {
      permitirBorrarInicio: value !== 'false',
    };
  }

  async guardar(datos: ConfiguracionApp): Promise<void> {
    await Preferences.set({
      key: CLAVE,
      value: datos.permitirBorrarInicio ? 'true' : 'false',
    });
  }
}

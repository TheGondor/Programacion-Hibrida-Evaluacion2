import { Cita } from './cita';
import { ConfiguracionApp } from './configuracion';

export interface PersistenciaConfiguracion {
  inicializar(): Promise<void>;
  obtener(): Promise<ConfiguracionApp>;
  guardar(datos: ConfiguracionApp): Promise<void>;
}

export interface PersistenciaCitas {
  iniciarPlugin(): Promise<void>;
  cerrarConexion(): Promise<void>;
  obtenerTodas(): Promise<Cita[]>;
  agregar(frase: string, autor: string): Promise<void>;
  eliminar(id: number): Promise<void>;
}

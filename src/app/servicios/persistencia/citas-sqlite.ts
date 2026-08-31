import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Cita } from '../../types/cita';
import { PersistenciaCitas } from '../../types/persistencia';

export class CitasSqlite implements PersistenciaCitas {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private iniciando: Promise<void> | null = null;

  constructor() {}

  async iniciarPlugin(): Promise<void> {
    if (this.db) {
      return;
    }
    if (this.iniciando) {
      await this.iniciando;
      return;
    }

    this.iniciando = this.abrirBase();
    try {
      await this.iniciando;
    } finally {
      this.iniciando = null;
    }
  }

  private async abrirBase(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      await customElements.whenDefined('jeep-sqlite');
      const jeep = document.querySelector('jeep-sqlite') as { componentOnReady?: () => Promise<unknown> } | null;
      if (jeep?.componentOnReady) {
        await jeep.componentOnReady();
      }
      await this.sqlite.initWebStore();
    }

    this.db = await this.sqlite.createConnection('citas.sqlite', false, 'no-encryption', 1, false);
    await this.db.open();

    const schema = `
      CREATE TABLE IF NOT EXISTS citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        frase TEXT NOT NULL,
        autor TEXT NOT NULL
      );
    `;
    await this.db.execute(schema);
    await this.cargarCitasIniciales();
  }

  async cerrarConexion(): Promise<void> {
    await this.db.close();
  }

  async agregar(frase: string, autor: string): Promise<void> {
    const sql = 'INSERT INTO citas(frase, autor) VALUES(?, ?)';
    await this.db.run(sql, [frase, autor]);
  }

  async eliminar(id: number): Promise<void> {
    const sql = 'DELETE FROM citas WHERE id = ?';
    await this.db.run(sql, [id]);
  }

  async obtenerTodas(): Promise<Cita[]> {
    const citas = await this.db.query('SELECT * FROM citas');
    return (citas.values ?? []) as Cita[];
  }

  /** Cuando no existen citas en la base de datos, se insertan las citas iniciales en la base de datos */
  private async cargarCitasIniciales(): Promise<void> {
    const resultado = await this.db.query('SELECT COUNT(id) as total FROM citas');
    const total = Number(resultado.values?.[0]?.total ?? 0);
    if (total > 0) {
      return;
    }

    await this.db.run('INSERT INTO citas(frase, autor) VALUES(?, ?)', [
      'El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.',
      'Ralph Waldo Emerson',
    ]);
    await this.db.run('INSERT INTO citas(frase, autor) VALUES(?, ?)', [
      'Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.',
      'Thomas Edison',
    ]);
    await this.db.run('INSERT INTO citas(frase, autor) VALUES(?, ?)', [
      'Ningún viento es bueno para el barco que no sabe adónde va.',
      'Séneca',
    ]);
  }
}

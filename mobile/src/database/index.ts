import { SQLiteDatabase } from 'expo-sqlite';
import { CREATE_TABLES, CREATE_TRIGGERS, CREATE_PREFERENCES_TABLE } from './schema';
import { INITIAL_CATEGORIES, SEED_CATEGORIES_QUERY } from './seed';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 2;

  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = result?.user_version ?? 0;
  console.log(`🔍 Versión actual de la DB: ${currentDbVersion}`);

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log(`✅ Base de datos SQLite cargada y lista. (Versión: ${currentDbVersion})`);
    return;
  }

  if (currentDbVersion === 0) {
    console.log('⏳ Inicializando esquema y tablas SQLite por primera vez...');
    try {
      await db.execAsync(CREATE_TABLES);
      console.log('✅ Tablas creadas correctamente.');
      await db.execAsync(CREATE_TRIGGERS);
      console.log('✅ Triggers configurados correctamente.');
    } catch (err) {
      console.error('❌ Error crítico creando esquema base:', err);
      throw err;
    }

    console.log('✅ Tablas y Triggers creados. Inyectando categorías iniciales...');

    // Poblar (seed) las categorías la primera vez
    let insertedCount = 0;
    try {
      const statement = await db.prepareAsync(SEED_CATEGORIES_QUERY);
      try {
        for (const category of INITIAL_CATEGORIES) {
          await statement.executeAsync([
            category.name,
            category.is_income,
            category.icon,
            category.color,
            category.is_default
          ]);
          insertedCount++;
        }
      } finally {
        await statement.finalizeAsync();
      }
      console.log(`✅ Semilla de categorías insertada: ${insertedCount} registros.`);
    } catch (err) {
      console.error('❌ Error insertando categorías iniciales:', err);
    }
    
    currentDbVersion = 1;
    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
    console.log('🎉 Inicialización completada exitosamente.');
  }

  // MIGRACIÓN A V2
  if (currentDbVersion === 1) {
    console.log('⬆️ Migrando base de datos de v1 a v2...');
    await db.execAsync(CREATE_PREFERENCES_TABLE);
    currentDbVersion = 2;
    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
    console.log('✅ Migración a v2 (Tabla Preferences) completada.');
  }
}

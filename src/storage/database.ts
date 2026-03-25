import { addRxPlugin, createRxDatabase } from 'rxdb/plugins/core';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { type HabitCollection, habitSchema } from './schemas/habit';

addRxPlugin(RxDBDevModePlugin);

type HabitDatabaseCollections = {
  habits: HabitCollection;
};

const initializeDatabase = async () => {
  const storage = wrappedValidateAjvStorage({
    storage: getRxStorageLocalstorage(),
  });

  const habitDatabase = await createRxDatabase<HabitDatabaseCollections>({
    name: 'habit-database',
    storage: storage,
    multiInstance: false,
    closeDuplicates: true,
  });

  await habitDatabase.addCollections({
    habits: {
      schema: habitSchema,
    },
  });

  return habitDatabase;
};

export type { HabitDatabaseCollections };
export { initializeDatabase };

import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  type RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

const habitSchemaLiteral = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      final: true,
      maxLength: 36,
    },
    title: {
      type: 'string',
      maxLength: 255,
    },
    description: {
      type: 'string',
    },
    created: {
      type: 'string',
      format: 'date-time',
      final: true,
      //! Default to epoch time for testing only right now, as when the DB is created, the
      //! hash will be different if we just use the current time and we will get DB6 error
      default: new Date('1970-01-01T00:00:00.000Z').toISOString(),
    },
    frequency: {
      type: 'array',
      default: ['M', 'Tu', 'W', 'Th', 'F'],
    },
    routineId: {
      type: 'string',
      maxLength: 36,
    },
  },
  required: ['id', 'title'],
  //   required: ['id', 'title', 'frequency'],
} as const;

const schemaTyped = toTypedRxJsonSchema(habitSchemaLiteral);

type HabitDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
type HabitCollection = RxCollection<HabitDocType>;
const habitSchema: RxJsonSchema<HabitDocType> = habitSchemaLiteral;

export { type HabitDocType, type HabitCollection };
export { habitSchema };

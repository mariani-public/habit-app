import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  type RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

const historySchemaLiteral = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      final: true,
      maxLength: 36,
    },
    habitId: {
      type: 'string',
      maxLength: 36,
    },
    date: {
      type: 'string',
      format: 'date-time',
      final: true,
      //! Default to epoch time for testing only right now, as when the DB is created, the
      //! hash will be different if we just use the current time and we will get DB6 error
      default: new Date('1970-01-01T00:00:00.000Z').toISOString(),
    },
    status: {
      type: 'string',
      enum: ['completed', 'missed', 'skipped'],
    },
  },
  required: ['id', 'habitId', 'date', 'status'],
} as const;

const schemaTyped = toTypedRxJsonSchema(historySchemaLiteral);

type HistoryDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
type HistoryCollection = RxCollection<HistoryDocType>;
const historySchema: RxJsonSchema<HistoryDocType> = historySchemaLiteral;

export { type HistoryDocType, type HistoryCollection };
export { historySchema };

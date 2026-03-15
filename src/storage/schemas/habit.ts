import {
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxCollection,
	type RxJsonSchema,
	toTypedRxJsonSchema,
} from "rxdb";

export const habitSchemaLiteral = {
	version: 0,
	primaryKey: "id",
	type: "object",
	properties: {
		id: {
			type: "string",
			final: true,
			maxLength: 36,
		},
		title: {
			type: "string",
			maxLength: 255,
		},
		description: {
			type: "string",
		},
		created: {
			type: "string",
			format: "date-time",
			final: true,
			default: new Date().toISOString(),
		},
	},
	required: ["id", "title"],
} as const;

const schemaTyped = toTypedRxJsonSchema(habitSchemaLiteral);

type HabitDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof schemaTyped
>;
type HabitCollectionType = RxCollection<HabitDocType>;
type HabitCollection = RxCollection<HabitDocType>;
const habitSchema: RxJsonSchema<HabitDocType> = habitSchemaLiteral;

export { type HabitDocType, type HabitCollectionType, type HabitCollection };
export { habitSchema };

import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export function assertSchema(schema, data) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    throw new Error(`Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`);
  }

  return true;
}
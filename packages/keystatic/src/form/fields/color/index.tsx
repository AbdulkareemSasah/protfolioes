
import { BasicFormField } from '../../api';
import { FieldDataError } from '../error';
import {
  RequiredValidation,
  assertRequired,
  basicFormFieldWithSimpleReaderParse,
} from '../utils';
import { ColorFieldInput } from './ui';
import { validateColor } from './validateColor';

export function color<IsRequired extends boolean | undefined>({
  label,
  defaultValue,
  validation,
  description,
}: {
  label: string;
  defaultValue?: string;
  validation?: { isRequired?: IsRequired };
  description?: string;
} & RequiredValidation<IsRequired>): BasicFormField<
  string | null,
  string | (IsRequired extends true ? never : null)
> {
  return basicFormFieldWithSimpleReaderParse({
    label,
    Input(props) {
      return (
        <ColorFieldInput
          label={label}
          description={description}
          validation={validation}
          {...props}
        />
      );
    },
    defaultValue() {
      return defaultValue ?? null;
    },
    parse(value) {
      if (value === undefined) {
        return null;
      }
      if (typeof value === 'string') {
        return value;
      }
      throw new FieldDataError('Must be a string');
    },
    validate(value) {
      const message = validateColor(value, label, validation?.isRequired);
      if (message !== undefined) {
        throw new FieldDataError(message);
      }
      assertRequired(value, validation, label);
      return value;
    },
    serialize(value) {
      return { value: value === null ? undefined : value };
    },
  });
}

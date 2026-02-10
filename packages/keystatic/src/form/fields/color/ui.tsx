
import { FormFieldInputProps } from '../../api';
import { TextField } from '@keystar/ui/text-field';
import { Flex } from '@keystar/ui/layout';
import { validateColor } from './validateColor';
import { useState } from 'react';

export function ColorFieldInput(
  props: FormFieldInputProps<string | null> & {
    label: string;
    description: string | undefined;
    validation: { isRequired?: boolean } | undefined;
  }
) {
  const [blurred, setBlurred] = useState(false);
  const value = props.value ?? '';
  const errorMessage =
    props.forceValidation || blurred
      ? validateColor(value, props.label, props.validation?.isRequired)
      : undefined;

  return (
    <Flex gap="regular" alignItems="end">
      <TextField
        label={props.label}
        description={props.description}
        autoFocus={props.autoFocus}
        value={value}
        onChange={props.onChange}
        onBlur={() => setBlurred(true)}
        isRequired={props.validation?.isRequired}
        errorMessage={errorMessage}
        width="100%"
      />
      <div
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid #ddd',
          marginBottom: errorMessage ? 26 : 0, // Align with input box, accounting for error message space roughly
        }}
      >
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'}
          onChange={e => {
            props.onChange(e.target.value);
          }}
          style={{
            width: '150%',
            height: '150%',
            margin: '-25%',
            padding: 0,
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </Flex>
  );
}


export function validateColor(
  value: string | null,
  label: string,
  isRequired?: boolean
) {
  if (value === null || value === '') {
    if (isRequired) {
      return `${label} is required`;
    }
    return undefined;
  }

  if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
    return `${label} must be a valid hex color (e.g. #ff0000)`;
  }

  return undefined;
}

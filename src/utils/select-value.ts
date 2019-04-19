export function selectEventToValue(event: any) {
  const targetValue = event.target.value;
  if (targetValue === '') {
    return undefined;
  }

  const parsed = parseInt(targetValue);
  if (isNaN(parsed)) {
    return undefined;
  }

  return parsed;
}

export function numberToSelectValue(value: number | undefined) {
  if (value === undefined) {
    return '';
  }

  return value.toString(10);
}

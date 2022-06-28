import { Colors } from '../constants/Colors';

export const OverridesColors = {
  ...Colors,
};

export function hexToRgbA(hex: string, a: number) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${a})` : '';
}

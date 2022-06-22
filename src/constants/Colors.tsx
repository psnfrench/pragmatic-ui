export const Colors = {
  greyscale: {
    input: '#F0EEEE',
    offWhite: '#FCFCFC',
    offBlack: '#101111',
    label: '#666060',
    body: '#303333',
    line: '#DBD7D7',
    coolGrey: '#A0A3BD',
    coolGrey400: '#D9DBE9',
    coolGrey500: '#A0A3BD',
    coolGrey600: '#6E7191',
    placehold: '#A6A0A0',
    light: '#9FB3C8',
  },
  error: {
    main: '#E61B00',
    dark: '#AB1400',
    light: '#FFF2F1',
  },
  success: {
    main: '#18BB0C',
    // dark: '#AB1400',
    // light: '#FFF2F1',
    background: '#CBFFAE',
  },
  primary: {
    main: '#DB3757',
    dark: '#DB3757',
    light: '#DB3757',
    contrastText: '#FFFFFF',
    background: '#EFF0F6',
    lightBackground: '#A6D4FA',
  },
  secondary: {
    main: '#757EF2',
    dark: '#757EF2',
    light: '#757EF2',
    contrastText: '#FFFFFF',
    background: '#FFDBBD',
  },
  text: {
    primary: '#102A43',
    secondary: 'rgba(97, 97, 97, 0.9)',
    disabled: 'rgba(170, 170, 170, 0.8)',
  },
};

export function hexToRgbA(hex: string, a: number) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${a})` : '';
}

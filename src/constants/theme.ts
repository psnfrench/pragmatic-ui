import { createTheme } from '@mui/material/styles';
import { Colors } from './Colors';

export const createPragmaticTheme = ({ borderRadius }: { borderRadius: number }) =>
  createTheme({
    palette: {
      primary: Colors.primary,
      secondary: Colors.secondary,
      text: Colors.text,
      error: Colors.error,
      action: {
        hoverOpacity: 0.08,
        disabledOpacity: 0.12,
      },
      success: Colors.success,
    },
    shape: {
      borderRadius,
    },
    typography: {
      fontFamily: 'Inter',
      allVariants: {
        color: Colors.text.primary,
      },
      h6: {
        fontWeight: 'bold',
        fontSize: 26,
        lineHeight: '32px',
        letterSpacing: 0.15,
      },
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 3,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 0.75,
            lineHeight: '24px',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              transitionDelay: '9999s',
              transitionProperty: 'background-color, color',
            },
            '&.Mui-disabled': {
              WebkitTextFillColor: 'unset',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'filled',
          InputProps: {
            disableUnderline: true,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius,
            backgroundColor: Colors.greyscale.input,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: Colors.greyscale.input,
            '&.Mui-focused': {
              backgroundColor: Colors.greyscale.offWhite,
              borderColor: Colors.greyscale.offBlack,
            },
            '&.Mui-error': {
              backgroundColor: Colors.error.light,
              borderColor: Colors.error.main,
            },
            '&.Mui-disabled': {
              backgroundColor: Colors.primary.background,
              opacity: 0.5,
              color: Colors.greyscale.label,
            },
          },
          input: {
            paddingTop: 16,
            paddingBottom: 16,
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: '0px',
            },
          },
          multiline: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 0.15,
            transform: 'translate(0px, 0px)', // override the shrink behaviour
            '&.Mui-focused': {
              color: Colors.greyscale.label,
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '&.MuiTextField-root': {
              paddingTop: '32px', // allow for label
            },
            '.MuiFilledInput-root': {
              backgroundColor: Colors.primary.background,
              borderColor: Colors.primary.background,
              paddingRight: '0px', // for select drop downs to be will width
            },
          },
        },
      },
      // MuiFormControl: {
      //   styleOverrides: {
      //     root: {
      //       '.MuiFilledInput-root': {
      //         backgroundColor: Colors.primary.background,
      //         borderColor: Colors.primary.background,
      //         paddingRight: '0px', // for select drop downs to be will width
      //       },
      //       '.MuiInputLabel-shrink': {
      //         left: '12px', // added 12px
      //         transform: 'translate(14px, 7px) scale(0.75)', // reduce the transform height to be within the box
      //       },
      //     },
      //   },
      // },
      MuiIconButton: {
        styleOverrides: {
          edgeEnd: {
            marginRight: 0, // to 'undo' the 0px padding for select drop downs applied in MuiFormControl overrides
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          sizeLarge: {
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 24,
            paddingRight: 24,
            fontSize: 16,
            fontWeight: 600,
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.MuiButtonBase-root': {
              color: 'inherit',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginBottom: 20,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: Colors.primary.background,
            borderRadius,
            '&  ul > li.MuiMenuItem-root:hover': {
              color: Colors.primary.main,
              backgroundColor: Colors.primary.background,
            },
            '&  ul > li.MuiMenuItem-root.Mui-selected': {
              color: Colors.primary.main,
              backgroundColor: Colors.primary.background,
            },
            '&  ul > li.MuiMenuItem-root': {
              color: Colors.greyscale.placehold,
            },
          },
        },
      },
    },
  });

export const theme = createPragmaticTheme({ borderRadius: 16 });

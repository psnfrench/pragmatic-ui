import { createTheme } from '@mui/material/styles';
import { Colors } from 'pragmatic-ui';

/**
 * Pegasus Typograpy Has three Categories: Display, Text and Link
 * Each Category can be in any Of the following sizes: Large, Medium, Small
 * Display has the additional size option of Huge
 * Text and Link have the additional size option of X-Small
 */

declare module '@mui/material/styles' {
  // Pegasus Variants
  interface TypographyVariants {
    displayHuge: React.CSSProperties;
    displayLarge: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displaySmall: React.CSSProperties;
    displayHugeBold: React.CSSProperties;
    displayLargeBold: React.CSSProperties;
    displayMediumBold: React.CSSProperties;
    displaySmallBold: React.CSSProperties;
    displayXSmallBold: React.CSSProperties;
    textLarge: React.CSSProperties;
    textMedium: React.CSSProperties;
    textSmall: React.CSSProperties;
    textXSmall: React.CSSProperties;
    linkLarge: React.CSSProperties;
    linkMedium: React.CSSProperties;
    linkSmall: React.CSSProperties;
    linkXSmall: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    displayHuge?: React.CSSProperties;
    displayLarge?: React.CSSProperties;
    displayMedium?: React.CSSProperties;
    displaySmall?: React.CSSProperties;
    displayHugeBold?: React.CSSProperties;
    displayLargeBold?: React.CSSProperties;
    displayMediumBold?: React.CSSProperties;
    displaySmallBold?: React.CSSProperties;
    displayXSmallBold?: React.CSSProperties;
    textLarge?: React.CSSProperties;
    textMedium?: React.CSSProperties;
    textSmall?: React.CSSProperties;
    textXSmall?: React.CSSProperties;
    linkLarge?: React.CSSProperties;
    linkMedium?: React.CSSProperties;
    linkSmall?: React.CSSProperties;
    linkXSmall?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayHuge: true;
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    displayHugeBold: true;
    displayLargeBold: true;
    displayMediumBold: true;
    displaySmallBold: true;
    displayXSmallBold: true;
    textLarge: true;
    textMedium: true;
    textSmall: true;
    textXSmall: true;
    linkLarge: true;
    linkMedium: true;
    linkSmall: true;
    linkXSmall: true;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}

export const theme = createTheme({
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
    borderRadius: 32,
  },
  typography: {
    fontFamily: 'Inter',
    allVariants: {
      color: Colors.greyscale.body,
    },
    displayHuge: {
      fontSize: 34,
      lineHeight: '48px',
      letterSpacing: 1,
    },
    displayLarge: {
      fontSize: 28,
      lineHeight: '40px',
      letterSpacing: 1,
    },
    displayMedium: {
      fontSize: 24,
      lineHeight: '34px',
      letterSpacing: 1,
    },
    displaySmall: {
      fontSize: 20,
      lineHeight: '32px',
      letterSpacing: 1,
    },
    displayHugeBold: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: '48px',
      letterSpacing: 1,
    },
    displayLargeBold: {
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: '40px',
      letterSpacing: 1,
    },
    displayMediumBold: {
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '34px',
      letterSpacing: 1,
    },
    displaySmallBold: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '32px',
      letterSpacing: 1,
    },
    displayXSmallBold: {
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: 1,
    },
    textLarge: {
      fontSize: 20,
      lineHeight: '32px',
      letterSpacing: 0.75,
    },
    textMedium: {
      fontSize: 17,
      lineHeight: '28px',
      letterSpacing: 0.75,
    },
    textSmall: {
      fontSize: 15,
      lineHeight: '24px',
      letterSpacing: 0.75,
    },
    textXSmall: {
      fontSize: 13,
      lineHeight: '22px',
      letterSpacing: 0.25,
    },
    linkLarge: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '32px',
      letterSpacing: 0.75,
      color: Colors.primary.main,
    },
    linkMedium: {
      fontWeight: 'bold',
      fontSize: 17,
      lineHeight: '28px',
      letterSpacing: 0.75,
    },
    linkSmall: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: '24px',
      letterSpacing: 0.75,
    },
    linkXSmall: {
      fontWeight: 600,
      fontSize: 13,
      lineHeight: '22px',
      letterSpacing: 0.25,
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
        },
        // flexContainer: {
        //   height: '100%',
        // },
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
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '30px',
    //       textTransform: 'none',
    //     },
    //     outlined: {
    //       backgroundColor: white,
    //       borderWidth: '2px',
    //       '&:hover': {
    //         borderWidth: '2px',
    //       },
    //     },
    //   },
    // },
    // MuiDivider: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: primaryMain,
    //       marginBottom: '24px',
    //     },
    //   },
    // },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       borderBottom: 'none',
    //     },
    //   },
    // },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayHuge: 'h1',
          displayHugeBold: 'h1',
          displayLarge: 'h2',
          displayLargeBold: 'h2',
          displayMedium: 'h3',
          displayMediumBold: 'h3',
          displaySmall: 'h4',
          displaySmallBold: 'h4',
          displayXSmallBold: 'h4',
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
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
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
          paddingLeft: '24px', // added 12px
          paddingRight: '24px', // added 12px
          '&.MuiInputBase-inputAdornedStart': {
            paddingLeft: '0px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: Colors.greyscale.label,
          },
        },
        filled: {
          left: '12px', // added 12px
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '.MuiFilledInput-root': {
            backgroundColor: Colors.primary.background,
            borderColor: Colors.primary.background,
            paddingRight: '0px', // for select drop downs to be will width
          },
          '.MuiInputLabel-shrink': {
            left: '12px', // added 12px
            transform: 'translate(14px, 7px) scale(0.75)', // reduce the transform height to be within the box
          },
        },
      },
    },
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
        sizeMedium: {
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
          borderRadius: '16px',
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

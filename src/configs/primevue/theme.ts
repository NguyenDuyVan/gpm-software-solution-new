import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{blue.500}',
          inverseColor: '#ffffff',
          hoverColor: '{blue.400}',
          activeColor: '{blue.300}',
        },
        highlight: {
          background: '{blue.500}',
          focusBackground: '{blue.200}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        secondary: {
          color: '#fff',
        },
      },
      dark: {
        primary: {
          color: '{blue.500}',
          inverseColor: '#ffffff',
          hoverColor: '{blue.400}',
          activeColor: '{blue.300}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        secondary: {
          color: '{slate.700}',
        },
      },
    },
  },
});

export default {
  preset: MyPreset,
  options: {
    darkModeSelector: '.dark',
  },
};

import { Platform } from 'react-native';
const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: Platform.select({
      default: 'Gothic',
      android: 'Roboto',
      ios: 'Arial',
    }),
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
// eslint-disable-next-line no-undef
console.log(theme.fonts)
export default theme;
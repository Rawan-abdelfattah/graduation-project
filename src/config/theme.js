// theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    main: {
      100: "#3B8F4F"
    }, // This is your custom color
  },
});

export default customTheme;

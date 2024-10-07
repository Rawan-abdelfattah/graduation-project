import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";  // Your global styles file

const customTheme = extendTheme(
  globalStyles,
  {
    colors: {
      main: "#3B8F4F", // Your main color defined here
      // Add more custom colors if needed
    },
    components: {
      Input: {
        baseStyle: {
          field: {
            borderColor: "main.100", // Use your main color for border
            _focus: {
              borderColor: "main.100", // Ensure focused state also has the main color
              boxShadow: "0 0 0 1px var(--chakra-colors-main-100)", // Apply box shadow with main color on focus
            },
          },
        },
        variants: {
          outline: {
            field: {
              borderColor: "main.100", // Outline variant border color
            },
          },
          filled: {
            field: {
              borderColor: "main.100", // Filled variant border color
            },
          },
        },
      },
    },
  }
);

export default customTheme;

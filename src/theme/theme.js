import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"; // Import mode utility function
import { globalStyles } from "./styles";  // Your global styles file

const customTheme = extendTheme(
  globalStyles,
  {
    colors: {
      main: "#3B8F4F", // Your main color
      lightText: "#000000", // Text color for light mode
      darkText: "#FFFFFF",  // Text color for dark mode
    },
    components: {
      Input: {
        baseStyle: (props) => ({
          field: {
            borderColor: "main", // Use your main color for the border
            color: mode("lightText", "darkText")(props), // Change text color based on mode
            _focus: {
              borderColor: "main", // Focused state border color
              boxShadow: "0 0 0 1px var(--chakra-colors-main)", // Focused state box shadow
            },
          },
        }),
        variants: {
          outline: (props) => ({
            field: {
              borderColor: "main", // Outline variant border color
              color: mode("lightText", "darkText")(props), // Outline variant text color
            },
          }),
          filled: (props) => ({
            field: {
              borderColor: "main", // Filled variant border color
              color: mode("lightText", "darkText")(props), // Filled variant text color
            },
          }),
        },
      },
    },
  }
);

export default customTheme;

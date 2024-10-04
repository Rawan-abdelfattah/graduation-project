import { createTheme, ThemeOptions } from "@mui/material/styles";
// import { useSelector } from "react-redux";

export const themeSetting = (
  mode: "light" | "dark",
  dir: "ltr" | "rtl",
): ThemeOptions => {

  return {
    direction: dir,

    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            // primary: { main: color },

            // secondary: "#544DD9",
            // neutral: "#544DD9",
            background: { main: "#1A2537", secondary: "#1F2A3D" },
            text: { main: "#DDDFE1" },
            
          }
        : {
            // palette values for light mode
            // primary: { main: color },
            background: { main: "##FFFFFF", secondary: "#F4F7FB" },
            text: { main: "#29343D", secondary: "#87939D" },
          }),
    }}
};

export default themeSetting;

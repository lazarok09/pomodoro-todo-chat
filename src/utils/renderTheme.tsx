import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";

export const renderTheme = (children: React.ReactNode) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

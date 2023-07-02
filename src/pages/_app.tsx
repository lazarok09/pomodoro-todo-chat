import { EagleIcon } from "../components/EagleIcon";

import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles/global-styles";
import { theme } from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <EagleIcon altText={"eagle"} height={384} width={416} />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

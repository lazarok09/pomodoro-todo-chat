import { theme } from "../styles/theme";
export type CustomTheme = typeof theme;

// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends ThemeProps, CustomTheme {}
}
